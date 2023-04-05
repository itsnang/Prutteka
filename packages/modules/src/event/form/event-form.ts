import { parse } from 'date-fns';
import { InitialValueType } from './form.types';

export const buildEventForm = (data: InitialValueType) => {
  const formData = new FormData();

  // detail
  if (data.image.file) {
    formData.append('image', data.image.file);
  }
  formData.append('name[en]', data.name.en);
  formData.append('name[km]', data.name.km);
  formData.append('type', data.type);

  data.categories.forEach((category, index) => {
    formData.append(`categories[${index}]`, category);
  });
  formData.append('detail[en]', data.detail);

  // date
  formData.append('date[start_date]', data.date.start_date);
  formData.append('date[end_date]', data.date.end_date);

  // times
  data.times.forEach((time) => {
    const startTime = parse(
      time.start_time,
      'HH:mm',
      new Date(time.date)
    ).toISOString();
    const endTime = parse(
      time.end_time,
      'HH:mm',
      new Date(time.date)
    ).toISOString();

    formData.append('times[0][date]', time.date);
    formData.append('times[0][start_time]', startTime);
    formData.append('times[0][end_time]', endTime);
  });

  // location
  data.locations.forEach((location, index) => {
    formData.append(`locations[${index}][name]`, location.name);
    formData.append(`locations[${index}][address]`, location.address);
    formData.append(`locations[${index}][type]`, location.type);

    if (location.type === 'google') {
      formData.append(`locations[${index}][url]`, location.url);
      formData.append(
        `locations[${index}][latlng][lat]`,
        location.latlng.lat.toString()
      );
      formData.append(
        `locations[${index}][latlng][lng]`,
        location.latlng.lng.toString()
      );
      formData.append(`locations[${index}][place_id]`, location.place_id);
      formData.append(`locations[${index}][image_src]`, location.image_src);
    }
  });

  // schedule
  data.schedules.forEach((schedule, scheduleIndex) => {
    const isScheduleEmpty = !schedule.schedules.every(
      (schedule) => schedule.activity.en.trim() || schedule.activity.km.trim()
    );
    if (isScheduleEmpty) return;

    formData.append(`schedules[${scheduleIndex}][date]`, schedule.date);
    schedule.schedules.forEach((_schedule, _scheduleIndex) => {
      const startTime = parse(
        _schedule.start_time,
        'HH:mm',
        new Date(schedule.date)
      ).toISOString();
      const endTime = parse(
        _schedule.end_time,
        'HH:mm',
        new Date(schedule.date)
      ).toISOString();

      formData.append(
        `schedules[${scheduleIndex}][schedules][${_scheduleIndex}][start_time]`,
        startTime
      );
      formData.append(
        `schedules[${scheduleIndex}][schedules][${_scheduleIndex}][end_time]`,
        endTime
      );

      formData.append(
        `schedules[${scheduleIndex}][schedules][${_scheduleIndex}][activity][en]`,
        _schedule.activity.en
      );
      formData.append(
        `schedules[${scheduleIndex}][schedules][${_scheduleIndex}][activity][km]`,
        _schedule.activity.km
      );
    });
  });

  // join method
  data.join_methods.forEach((method, index) => {
    formData.append(`join_methods[${index}][name][en]`, method.name.en);
    formData.append(`join_methods[${index}][name][km]`, method.name.km);
    formData.append(`join_methods[${index}][link]`, method.link);
  });

  // dynamic content
  data.dynamic_contents.forEach((content, contentIndex) => {
    formData.append(
      `dynamic_contents[${contentIndex}][name][en]`,
      content.name.en
    );
    formData.append(
      `dynamic_contents[${contentIndex}][name][km]`,
      content.name.km
    );
    content.items.forEach((item, itemIndex) => {
      formData.append(`dynamic_content_images`, item.image.file as Blob);

      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][name][en]`,
        item.name.en
      );
      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][name][km]`,
        item.name.km
      );

      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][en]`,
        item.detail.en
      );
      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][km]`,
        item.detail.km
      );
    });
  });

  return formData;
};
