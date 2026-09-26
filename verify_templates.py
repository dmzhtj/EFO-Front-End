from pathlib import Path
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('templates'))
files = sorted(Path('templates').rglob('*.html'))
errors = []

for f in files:
    try:
        env.get_template(str(f.relative_to('templates')).replace('\\', '/'))
    except Exception as e:
        errors.append((str(f), type(e).__name__, str(e)))

if errors:
    print('JINJA_ERRORS')
    for fp, kind, msg in errors:
        print(f'{fp}: {kind}: {msg}')
    raise SystemExit(1)

print(f'Validated {len(files)} template files successfully.')
