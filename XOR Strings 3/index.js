process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
    // now we can read/parse input
    var lines = input.trim().split(/\r?\n/);
    var a = lines[0].trim();
    var b = lines[1].trim();

    var out = [];
    for (var i = 0; i < a.length; i++) {
        out.push(a[i] === b[i] ? "0" : "1");
    }
    console.log(out.join(""));
});