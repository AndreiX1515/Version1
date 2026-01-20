$(function () {

  /** --------------------------------------------------
   *   (Range Picker)
   --------------------------------------------------**/
  const $contractInput = $('#contract-period');

  if ($contractInput.length) {
    $contractInput.daterangepicker({
      autoUpdateInput: false,
      // :    100  
      // daterangepicker   dateLimit  maxSpan        
      // NOTE:
      // - daterangepicker days  "end-start"   ( )  
      //   days:100   101()  ,  (<=100)  .
      // -   99  " 100" .
      dateLimit: { days: 99 },
      maxSpan: { days: 99 },
      locale: {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        daysOfWeek: ['Su','Mo','Tu','We','Th','Fr','Sa'],
        monthNames: [
          'January','February','March','April','May','June',
          'July','August','September','October','November','December'
        ],
        firstDay: 0
      }
    });

    $contractInput.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(
        picker.startDate.format('YYYY-MM-DD') +
        ' ~ ' +
        picker.endDate.format('YYYY-MM-DD')
      );
    });

    $contractInput.on('cancel.daterangepicker', function () {
      $(this).val('');
    });
  }

  /** --------------------------------------------------
   * Exposure Period (Range Picker) - for notice-detail.html
   --------------------------------------------------**/
  const $exposurePeriodInput = $('#exposurePeriod');

  if ($exposurePeriodInput.length) {
    $exposurePeriodInput.daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        daysOfWeek: ['Su','Mo','Tu','We','Th','Fr','Sa'],
        monthNames: [
          'January','February','March','April','May','June',
          'July','August','September','October','November','December'
        ],
        firstDay: 0
      }
    });

    $exposurePeriodInput.on('apply.daterangepicker', function (ev, picker) {
      const startDate = picker.startDate.format('YYYY-MM-DD');
      const endDate = picker.endDate.format('YYYY-MM-DD');
      $(this).val(startDate + ' ~ ' + endDate);
      // Update data attributes for the notice-detail.html to read
      $(this).attr('data-start', startDate);
      $(this).attr('data-end', endDate);
    });

    $exposurePeriodInput.on('cancel.daterangepicker', function () {
      $(this).val('');
      $(this).removeAttr('data-start');
      $(this).removeAttr('data-end');
    });
  }


  /** --------------------------------------------------
   *   (Single Date Picker)
   --------------------------------------------------**/
  const $travelInput = $('#travelStartDate');

  if ($travelInput.length) {
    $travelInput.daterangepicker({
      singleDatePicker: true,
      autoUpdateInput: false,
      locale: {
        format: 'YYYY-MM-DD',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel'
      }
    });

    $travelInput.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(picker.startDate.format('YYYY-MM-DD'));
    });

    $travelInput.on('cancel.daterangepicker', function () {
      $(this).val('');
    });
  }

    /** --------------------------------------------------
   *    (Single Date Picker)
   --------------------------------------------------**/
   const $depositInput  = $('#deposit_due');

   if ($depositInput .length) {
     $depositInput .daterangepicker({
       singleDatePicker: true,
       autoUpdateInput: false,
       locale: {
         format: 'YYYY-MM-DD',
         applyLabel: 'Apply',
         cancelLabel: 'Cancel'
       }
     });
 
     $depositInput .on('apply.daterangepicker', function (ev, picker) {
       $(this).val(picker.startDate.format('YYYY-MM-DD'));
     });
 
     $depositInput .on('cancel.daterangepicker', function () {
       $(this).val('');
     });
   }


  /** --------------------------------------------------
   * :    → data-target  input
   --------------------------------------------------**/
  $(document).on('click', '.btn-icon.calendar, .calendar-trigger', function () {
    const targetSelector = $(this).data('target');   // : "#contract-period"  "#travelStartDate"
    if (!targetSelector) return;

    const $target = $(targetSelector);
    if ($target.length) {
      $target.trigger('click').focus();
    }
  });

});
