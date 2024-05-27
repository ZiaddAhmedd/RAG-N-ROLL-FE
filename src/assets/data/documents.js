const documents = [
    { id: 1, text: 'Document 1 text' },
    { id: 2, text: 'Document 2 text' },
    { id : 3, text: 'Document 3 text'},
    { id : 4, text: 'Document 4 text'},
    { id : 5, text: 'Document 5 text'},
    { id : 6, text: 'Document 6 text'},
    { id : 7, text: 'Document 7 text'},
    { id : 9, text: 'Document 9 text'},
    { id : 10, text: 'Document 10 text'},

  ];
  
  const documentTexts = documents.map(document => document.text);
  
  export default documentTexts;