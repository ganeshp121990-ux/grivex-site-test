import codecs

with codecs.open(r'c:\grivex-site 3.0\components\Catalog\Footer.tsx', 'r', 'utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '</div >' in line:
        print(f"Line {str(i+1).zfill(3)}: {line.strip()}")
