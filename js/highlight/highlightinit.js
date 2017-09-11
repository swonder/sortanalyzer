document.addEventListener("DOMContentLoaded", function(event) {
  function initSnippet() {
    var snippet = document.querySelector('#snippet pre code');
    hljs.highlightBlock(snippet);
    var style = 'vs';
  }
});
