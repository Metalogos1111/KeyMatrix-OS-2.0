"""Local differential check: independent standard-library implementations vs candidate engine.
Not an external review or external independent replication.
"""
import hashlib, json, math, os, random, sys, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = Path(os.environ.get("PATTERN_ENGINE_SOURCE_DIR", str(ROOT / "KM-PATTERN-ENGINE-001"))).resolve()
sys.path.insert(0, str(SOURCE))
from src.engine import pearson_correlation as engine_pearson, zscore_outliers as engine_outliers, kmeans as engine_kmeans

SEED = 20261031
rng = random.Random(SEED)

def independent_pearson(x, y):
    if len(x) != len(y) or len(x) < 2:
        raise ValueError("shape")
    mx = sum(x) / len(x)
    my = sum(y) / len(y)
    dx = [a - mx for a in x]
    dy = [b - my for b in y]
    sx = sum(a * a for a in dx)
    sy = sum(b * b for b in dy)
    den = math.sqrt(sx * sy)
    if den == 0:
        raise ValueError("constant")
    return sum(a * b for a, b in zip(dx, dy)) / den

def independent_outliers(values, threshold=3.0):
    if not values or not math.isfinite(threshold) or threshold <= 0:
        raise ValueError("input")
    mu = sum(values) / len(values)
    variance = sum((v - mu) ** 2 for v in values) / len(values)
    if variance == 0:
        return []
    sd = math.sqrt(variance)
    return [i for i, v in enumerate(values) if abs((v - mu) / sd) > threshold]

def independent_kmeans(points, k, max_iterations=100):
    if not points or not isinstance(k, int) or k < 1 or k > len(points):
        raise ValueError("k")
    data = [tuple(float(v) for v in row) for row in points]
    dims = len(data[0])
    if dims == 0 or any(len(row) != dims for row in data):
        raise ValueError("dims")
    if not all(math.isfinite(v) for row in data for v in row):
        raise ValueError("finite")
    unique = sorted(set(data))
    if len(unique) < k:
        raise ValueError("unique")
    if max_iterations < 1:
        raise ValueError("iterations")
    centers = list(unique[:k])
    labels = None
    converged = False
    iterations = 0
    for step in range(max_iterations):
        assigned = []
        for point in data:
            distances = [sum((point[j] - center[j]) ** 2 for j in range(dims)) for center in centers]
            best = min(range(k), key=lambda idx: (distances[idx], idx))
            assigned.append(best)
        updated = []
        for idx, old in enumerate(centers):
            members = [point for point, label in zip(data, assigned) if label == idx]
            if members:
                updated.append(tuple(sum(point[j] for point in members) / len(members) for j in range(dims)))
            else:
                updated.append(old)
        iterations = step + 1
        stable = assigned == labels and updated == centers
        labels, centers = assigned, updated
        if stable:
            converged = True
            break
    inertia = sum(sum((v - centers[labels[i]][j]) ** 2 for j, v in enumerate(data[i])) for i in range(len(data)))
    return {"assignments": labels or [], "centroids": [list(c) for c in centers], "inertia": inertia,
            "iterations": iterations, "converged": converged}

start = time.time()
counts = {"pearson": 0, "outliers": 0, "kmeans": 0}
mismatches = []

for case in range(1000):
    n = rng.randint(3, 80)
    x = [rng.uniform(-100, 100) for _ in range(n)]
    y = [rng.uniform(-100, 100) for _ in range(n)]
    a = independent_pearson(x, y)
    b = engine_pearson(x, y)
    if not math.isclose(a, b, rel_tol=1e-12, abs_tol=1e-12):
        mismatches.append({"test": "pearson", "case": case, "independent": a, "engine": b})
    counts["pearson"] += 1

for case in range(1000):
    n = rng.randint(3, 120)
    values = [rng.gauss(0, rng.uniform(.1, 5)) for _ in range(n)]
    if case % 3 == 0:
        values[rng.randrange(n)] += rng.choice([-1, 1]) * rng.uniform(5, 40)
    threshold = rng.uniform(.5, 4.5)
    a = independent_outliers(values, threshold)
    b = engine_outliers(values, threshold)
    if a != b:
        mismatches.append({"test": "outliers", "case": case, "independent": a, "engine": b})
    counts["outliers"] += 1

for case in range(500):
    n = rng.randint(3, 28)
    dims = rng.randint(1, 4)
    k = rng.randint(1, min(4, n))
    points = [[rng.randint(-6, 6) for _ in range(dims)] for _ in range(n)]
    if len({tuple(p) for p in points}) < k:
        points.extend([[100 + case * 2 + i + j / 10 for j in range(dims)] for i in range(k)])
    a = independent_kmeans(points, k, max_iterations=100)
    b = engine_kmeans(points, k, max_iterations=100)
    same = (a["assignments"] == b["assignments"] and a["centroids"] == b["centroids"] and
            math.isclose(a["inertia"], b["inertia"], rel_tol=1e-12, abs_tol=1e-12) and
            a["iterations"] == b["iterations"] and a["converged"] == b["converged"])
    if not same:
        mismatches.append({"test": "kmeans", "case": case, "independent": a, "engine": b})
    counts["kmeans"] += 1

result = {
    "artifact_id": "KM-PATTERN-ENGINE-001-INDEPENDENT-ENGINE-CHECK-006",
    "seed": SEED,
    "checks": counts,
    "total_checks": sum(counts.values()),
    "mismatches": len(mismatches),
    "status": "PASS" if not mismatches else "FAIL",
    "method": "Separate standard-library implementations compared against candidate engine on deterministic randomized inputs.",
    "limitations": [
        "Local differential check only; not external independent replication.",
        "K-means reimplementation follows the documented deterministic initialization and tie/empty-cluster contract.",
        "Does not verify real-world generalization or runtime integration."
    ],
    "duration_seconds": round(time.time() - start, 3),
    "mismatch_examples": mismatches[:10]
}
out = ROOT / "independent_engine_check_006.json"
out.write_text(json.dumps(result, indent=2, sort_keys=True, allow_nan=False) + "\n", encoding="utf-8")
print(json.dumps(result, indent=2, sort_keys=True))
print("RESULT_SHA256", hashlib.sha256(out.read_bytes()).hexdigest(), "RESULT_BYTES", out.stat().st_size)
