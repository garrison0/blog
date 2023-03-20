for f in *.mdx; do
  [[ -f "$f" ]] || continue # skip if not regular file
  dir="${f%.*}"
  mkdir $dir
  mv "$f" "$dir/$dir.md"
done