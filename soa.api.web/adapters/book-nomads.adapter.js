
function transform(source) {
    return {
        isbn: source.ISBN,
        title: source.Title,
        authors: source.Authors.map(a => a.Name),
        source: 'NomadLibrary'
    };
}

module.exports = {
    tranform: transform
};