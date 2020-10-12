file_path = "test.json"  # your path variable
json.dump(b, codecs.open(file_path, 'w', encoding='utf-8'),
          separators=(',', ':'), sort_keys=True, indent=4)