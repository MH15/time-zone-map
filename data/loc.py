import json
from collections import Counter

# Opening JSON file
f = open('input.json')

# returns JSON object as
# a dictionary
data = json.load(f)


c = Counter(data)
print(c)


f = open('out.json', 'w')
f.write(json.dumps(c))
f.close()
