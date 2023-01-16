from pathlib import Path
HERE = Path(__file__).parent.absolute()


print(list((HERE / ".." / "..").glob("*")))

failed_tests = (HERE / ".." / ".." / "screenshots").glob("*")
print("screenshots", list(failed_tests))

all_tests = (HERE / "e2e").glob("*.cy.ts")
all_tests = [t.name.split("_") for t in all_tests]
