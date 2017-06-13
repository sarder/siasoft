var kendoEditorToolsList =[
              {
                  name: "formatting",
                  items: [].concat(
                        [
                         kendo.ui.editor.FormattingTool.prototype.options.items[0],
                         { text: "Quotation", value: "blockquote" },
                         { text: "Heading 1", value: "h1" },
                         { text: "Heading 2", value: "h2" },
                         { text: "Heading 3", value: "h3" },
                         { text: "Heading 4", value: "h4" },
                         { text: "Heading 5", value: "h5" },
                         { text: "Heading 6", value: "h6" },
                        
                        ]
                    )
              },
              {
                  name: "bold"
              },
              {
                  name: "italic"
              },
              {
                  name: "underline"
              },
              {
                  name: "justifyLeft",

              },
              {
                  name: "justifyRight",

              },
              {
                  name: "justifyCenter",

              },
              {
                  name: "justifyFull",

              },
              {
                  name: "insertUnorderedList",

              },
              {
                  name: "insertOrderedList",

              },
              {
                  name: "createLink",

              },
              {
                  name: "insertImage",

              },
              {
                  name: "foreColor",

              },
              {
                  name: "backColor",

              },
              {
                  name: "print",

              },
              {
                  name: "bdsPdf",
                  template: '<a class="bds-k-link" onclick="BdsKendoPdfGenerateor(this);"> <span class="k-tool-icon k-i-pdf"> </span></a>',

              }

            ];



function BdsKendoPdfGenerateor(element) {

    var editorID = $(element).closest("table").find("textarea").attr("id");
    if ($.trim($("#" + editorID).data("kendoEditor").value()) == "") {
        $("#divPDFModal").modal('show');
        return false;
    }

    $("[id*=hdnPdfDownLoadText]").val(HtmlEncode($("#" + editorID).data("kendoEditor").value()));
    setTimeout(function () { 
        $("[id*=btnPdfDownloadClick]").click(); 
    }, 100);

    return false;
    
}