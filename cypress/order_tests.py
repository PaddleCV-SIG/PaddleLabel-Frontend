''' Order the tests so previously failed ones get runed first '''
from pathlib import Path
HERE = Path(__file__).parent.absolute()


print(list((HERE / ".." / "..").glob("*")))

failed_tests = (HERE / ".." / ".." / "screenshots").glob("*")
print("screenshots:", [t.name for t in failed_tests])
failed_ids = [t.name.split("_")[0] for t in failed_tests]

tests = (HERE / "e2e").glob("*.cy.ts")
tests = list(tests)
print("all tests:", tests)

all_ids = [t.name.split("_")[0] for t in tests]
tests = {t.name.split("_")[0]: str(t.relative_to(HERE)) for t in tests}

ordered = [tests[idx] for idx in failed_ids] + [tests[idx] for idx in all_ids if idx not in failed_ids]
order = ",".join(ordered)

print(order)