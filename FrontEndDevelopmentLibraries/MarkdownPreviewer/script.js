function update() {
  $("#preview").html(marked($("#editor").val()));
  marked.setOptions({ breaks: true });
}

function load() {
  var text = `\
# H1

## H2

### H3

[Link] {https://www.freecodecamp.org}

\`Codeblock\`

\`\`\`
function example(){
return 0;
}
\`\`\`

- List

> Blockquote

[![IMAGE ALT TEXT HERE](https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.jpg)](https://www.freecodecamp.org)

**Bold Text**
`;

  $("#editor").val(text);
  $("#preview").html(marked(text));
}
