var loginUserID;

$(document).ready(function () {

    $("[data-toggle=popover]").popover();
    GetCodeBehindProperty();
    $("[id*=chkDemoSwitch]").kendoMobileSwitch({
        onLabel: "YES",
        offLabel: "NO"
    });
    //Kendo Date Picker =====
    $("[id*=txtClnDatePicker]").kendoDatePicker({ format: "dd/MM/yyyy",value:new Date() }).data("kendoDatePicker");

    //Time Picker=====
     $("[id*=txtClnTimePicker]").kendoTimePicker();

    //Date Time Picker
    $("[id*=txtClnDateTimePicker]").kendoDateTimePicker({value:new Date()});

    //Numeric Picker ==========
    $("[id*=txtNumNumericPicker]").kendoNumericTextBox({min: 0, max: 59});

    //Kendo Colour Picker =======
    $("[id*=txtClColurPicker]").kendoColorPicker().data("kendoColorPicker");


    // Kendo Editor ========
    $("[id*=txtArKendoEditor]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");



    // Kendo Combo Box ========
    InitializeKednoComboBox();

    //Dropdown List ====
    InitializeDropdownList();

    //Multi Select =========
    InitializeMultiSelect();

    //Slider ==========

    InitializeSlider();

    // Kendo Grid =======
    LoadKendoDataGrid();

    // Panel bar

    $("#panelbar").kendoPanelBar({
        expandMode: "single"
    });

    

    // Uploder ==========
    InitializeKendoUploadWidget();
    LoadPieChart();
    LoadMetroChart();
    LoadLineChart();
    LoadBulletChart();
    
});



function InitializeKednoComboBox() { 

    $("[id*=txtCmbComboBox]").kendoComboBox({
        placeholder: "Please choose",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        filter: "contains",
        autoBind: false,
        minLength: 3,
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    });


}

function InitializeMultiSelect(){
    $("[id*=ddlMltiSlect]").kendoMultiSelect({
        placeholder: "Please choose",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        autoBind: false,
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    });

}

function InitializeSlider(){
    $("[id*=txtSlSlider]").kendoSlider({
        increaseButtonTitle: "Right",
        decreaseButtonTitle: "Left",
        min: -10,
        max: 10,
        smallStep: 2,
        largeStep: 1
    }).data("kendoSlider");

}

function InitializeDropdownList(){

    $("[id*=ddlDropdownList]").kendoDropDownList({
        filter: "startswith",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    });

}


function LoadKendoDataGrid() {
    var dataURL = globalWCFUrl + "web/GetDemoUserList?userId=" + loginUserID;
    
    $("#divDataGrid").kendoGrid({
        
        dataSource:
        {
            transport: {
                read: {
                   url: dataURL,
                    dataType: "json"
                }
            },
            schema: {
                data: "d.UserList",
                total: "d.UserList",
                model:
                {
                    id: "USER_ID"

                }
            },
            pageSize: 15
        },
        height: 366,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
         {
             field: "USER_ID",
             title: "ID",
             width: "35px"
         },
         {
             field: "USER_FNAME",
             title: "First names",
             width: "35px"
         },

         {
             field: "USER_LNAME",
             title: "Last name",
             width: "35px"
         }
        ],
        selectable: true,
    });
}


function LoadPieChart() {
        $("#divChart").kendoChart({
            title: {
                position: "bottom",
                text: "Demo Chart BDS Kendo",
                font: "14px Arial,sans-serif !important"
            },
            legend: {
                visible: false
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    background: "transparent",
                    template: "#=  category  #: \n #= value#"
                }
            },
            series: [{
                type: "pie",
                startAngle: 150,
                data: [{
                    category: "Asia",
                    value: 53.8,
                    color: "#9de219"
                },{
                    category: "Europe",
                    value: 16.1,
                    color: "#90cc38"
                },{
                    category: "Latin America",
                    value: 11.3,
                    color: "#068c35"
                },{
                    category: "Africa",
                    value: 9.6,
                    color: "#006634"
                },{
                    category: "Middle East",
                    value: 5.2,
                    color: "#004d38"
                },{
                    category: "North America",
                    value: 3.6,
                    color: "#033939"
                }]
            }],
            tooltip: {
                visible: true,
                format: "{0}"
            }
        });
}

function LoadMetroChart() {
        $("#divDemoChartMetro").kendoChart({
            theme: "metro",
            title: {
                //  text: "Gross domestic product growth /GDP annual %/"
            },
            chartArea: {
                width: 1000,
                height: 150
            },

            legend: {
                position: "bottom"
            },
            series: [

                {
                    name: "SU Processed",
                    data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855, 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
                }, {
                    name: "Monthly Average",
                    data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, 4.3, 4.3, 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, 4.3, 4.3]
                },

        ],
            valueAxis: {
                labels: {
                    format: "{0:c2}",
                    visible: false
                },
                line: {
                    visible: false
                },
                majorGridLines: {
                    visible: false
                },
                axisCrossingValue: 0
            },


            categoryAxis: {
               
                categories: ["July '89", "Aug '89", "Sep '89", "Oct '89", "Nov '89", "Dec '89", "Jan '89", "Feb '89", "Mar '89", "App '89", "Jun '89", "July '89", "Aug '89", "Sep '89", "Oct '89", "Nov '89", "Dec '89", "Jan '89", "Feb '89", "Mar '89"],
                line: {
                    visible: false
                },
                majorGridLines: {
                    visible: false
                }

            },
            tooltip: {
                visible: true,
                format: "{0:c2}"
            }
        });
    }



    function LoadLineChart() {


    $("#divLineChart").kendoChart({
        theme: "metro",
        series: [
                {
                    type: "line",
                    width: 1.5,
                    markers: {
                        visible: false
                    },
                    data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, 4.3, 4.3, 4.743, 7.295, 4.175, 6.376, 8.153, 8.535, 5.247, 4.3, 4.3]
                },
        ],
        categoryAxis: {
            visible: false,
            majorGridLines: {
                visible: false
            },
            majorTicks: {
                visible: false
            }
        },
        legend: {
            visible: false
        },
        valueAxis: {
            type: "numeric",
            visible: false,
            labels: {
                visible: false
            },
            majorGridLines: {
                visible: false
            },
            majorTicks: {
                visible: false
            }
        }
    });

}


function LoadBulletChart() {

    $("#divChartBorder").kendoChart({
        theme: "metro",
        tooltip: false,
        dataSource: {
            transport: {
                read: {
                    url: "https://servicehostlive.caseworkerconnectonline.org/lcilkendo/LCILWCFApp.svc/web/GetUserMonthlyAverageById?userId=10",
                    dataType: "json"
                }

            }
        },

        series: [
                {
                    type: "bullet",
                    data: [50, 99]
                },
        ],
        legend: {
            visible: false
        },
        categoryAxis: {
            labels: {
                visible: false
            },
            majorGridLines: {
                visible: false
            }
        },
        valueAxis: {
            type: "numeric",
            labels: {
                visible: false
            },
            majorTicks: {
                visible: false
            },

            majorGridLines: {
                visible: false
            }
        }

    });
}

// Schedular=============

$(function() {
    $("#divScheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda",
            { type: "timeline", eventHeight: 50}
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { from: "TaskID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        ownerId: { from: "OwnerID", defaultValue: 1 },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "ownerId", operator: "eq", value: 1 },
                    { field: "ownerId", operator: "eq", value: 2 }
                ]
            }
        },
        resources: [
            {
                field: "ownerId",
                title: "Owner",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
                ]
            }
        ]
    });

    });
