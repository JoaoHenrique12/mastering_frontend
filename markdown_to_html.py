"""Markdown Converter to HTML

Author: HellSank

Description: 
    Input:
        This module request, via input(), the name of file containing markdown content.
    Output:
        A file called 'out.html' is created with HTML code referent of markdown file
        inserted.

"""

import markdown
from bs4 import BeautifulSoup as bs

file_name = input("File name: ")

text_markdown = ''
with open(file_name,'r') as f:
    text_markdown = f.read()

text_html = markdown.markdown(text_markdown)

# Just formating html generated.
text_html = bs(text_html,'html.parser').prettify() 

with open("out.html",'w') as f:
    f.write(text_html)

print("Markdown saved as 'out.html'.")
