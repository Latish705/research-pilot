from scholarly import scholarly

# Research Paper Fetching
def get_research_papers(query):
  search_query = scholarly.search_pubs(query)
  num_papers = 10
  papers = []
  for i, paper in enumerate(search_query):
      if i >= num_papers:
          break
      papers.append({
          "title": paper['bib']['title'],
          "author": paper['bib'].get('author', 'Unknown'),
          "link": paper.get('pub_url', 'N/A'),
          "pdf_Link": paper.get('eprint_url', 'N/A'),
        

      })

  print(papers)
  return list(papers)