$(document).on('ready', () => {
  $('.postNewClass').on('submit', (eve)=> {
    eve.preventDefault();
    function convertTime(timeVal) {
      let initialTime = timeVal;
      let timeArr = initialTime.split(':');
      if (timeArr[0] > 12) {
        timeArr[0] = parseInt(timeArr[0]);
        timeArr[0] -= 12;
        timeArr[0] = timeArr[0].toString();
        return timeArr.join(':') + 'pm';
      }
      else if (+timeArr[0] === 0) {
        timeArr[0] = '12';
        return timeArr.join(':') + 'am';
      }
      else {
        return initialTime + 'am';
      }
    }
    const className = $('.nameOfClass option:selected').val();
    const description = $('#description').val();
    const instructorId = $('.instructorID option:selected').attr('data-instructorid');
    const startTime = convertTime($('#start_time').val());
    const endTime = convertTime($('#end_time').val());
    const classSize = $('#size').val();
    const classDay = $('#classDay').val();
    $.ajax({
      type: 'POST',
      url: '/classes',
      data: {
        name: className,
        description: description,
        instructor_id: instructorId,
        day: classDay,
        start_time: startTime,
        end_time: endTime,
        size: classSize
      },
      success: (result) => {
        window.location = '/classes';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
});
