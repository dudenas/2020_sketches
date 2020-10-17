import numpy as np
import itertools
import codecs
import json

K = 4
N = 2
a = [np.reshape(np.array(i), (K, N))
     for i in itertools.product([0, 1], repeat=K*N)]
b = [a[i].tolist() for i in range(len(a))]

file_path = "matrix_4x4.json"  # your path variable
json.dump(b, codecs.open(file_path, 'w', encoding='utf-8'),
          separators=(',', ':'), sort_keys=True, indent=4)

print("done")
