function HtmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function HtmlDecode(value) {
    return $('<div/>').html(value).text();
}

function DecodehtmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}