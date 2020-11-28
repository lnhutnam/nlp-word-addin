var str ="This Phd www.fit.hcmus is a long string with some numbers [125.000,55 and 140.000] and an end. This is another sentence."

var sentences = str.replace(/\.(?!\d)/g,'.|');
console.log(sentences);