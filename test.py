import json

f = open('dictionary_alpha_arrays.json')
 
data = json.load(f)
 
# Iterating through the json
# list
# for i in data[0]:
#     print(i)
 
# # Closing file
# f.close()

result = []

for i in range(0,26):
  for j in data[i]:
    if (len(j) == 5):
      result.append(j)

json_data = json.dumps(result)

with open('eight_letter_words.json', 'w') as outfile:
    json.dump(json_data, outfile)