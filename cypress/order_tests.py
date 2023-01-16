from pathlib import Path

print(Path("."))
print(list(Path(".").glob("*")))

failed_tests = Path("../screenshots").glob("*")
print(list(failed_tests))

all_tests = Path("./cypress/e2e").glob("*.cy.ts")
print(list(all_tests))
