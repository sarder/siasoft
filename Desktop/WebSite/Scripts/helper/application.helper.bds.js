function BdsGridSortByElementValue(element) {

    var directionBy = $.trim($(element).attr("direc"));
    var columnName = $.trim($(element).attr("grid-column"));
    var gridNameID = $.trim($(element).attr("grid-id"));
    var hideControlClassName = $.trim($(element).attr("hide-ctr"));
    var dynamicGrid = $(gridNameID).data("kendoGrid").dataSource

    if (directionBy == "asc") {
        $(element).attr("direc", "desc");
    } else {
        $(element).attr("direc", "asc");
    }
    if ((typeof hideControlClassName !== 'undefined') || hideControlClassName != null || hideControlClassName != '') {
        $("." + hideControlClassName).hide();
    }
    
    dynamicGrid.sort({ field: columnName, dir: directionBy });
    dynamicGrid.view();
}