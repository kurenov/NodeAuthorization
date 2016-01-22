$(function () {
//   $("#slider-range").slider({
//  range: true,
//          min: 0,
//          max: 5,
//          values: [3, 4],
//          slide: function (event, ui) {
//          $("#amount").val("$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]);
//          }
//  });
//          $("#amount").val("$" + $("#slider-range").slider("values", 0) +
//          " - $" + $("#slider-range").slider("values", 1));
  
});

//$(document.ready(function() {
//  $("#slider-range").slider({
//    range: true,
//    min: 0,
//    max: 5,
//    values: [2.5, 4.5],
//    slide: function (event, ui) {
//      $("#amount").val(ui.values[0] + " - " + ui.values[1]);
//    }
//  });
//  $("#amount").val("$" + $("#slider-range").slider("values", 0) +
//          " - $" + $("#slider-range").slider("values", 1));
//}));

function showDialog(edit) {
  console.log('dialog');
  var productDialog = $('#product-dialog').dialog({
    resizable: false,
    height: 600,
    width: 600,
    modal: true,
    buttons: {
      "Save": function () {
        if (edit) {
          angular.element('#adminApp').scope().updateProduct();
        }
        else {
          angular.element('#adminApp').scope().addProduct();
        }
        $(this).dialog("close");
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    }
  });
  productDialog.dialog("open");
}
;

