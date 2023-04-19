import { parse } from 'date-fns';
import { InitialValueType } from './form.types';
import { APIResponseEvent } from 'custom-types';
import { format } from 'date-fns';

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
  data.times.forEach((time, index) => {
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

    formData.append(`times[${index}][date]`, time.date);
    formData.append(`times[${index}][start_time]`, startTime);
    formData.append(`times[${index}][end_time]`, endTime);
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
      content.name.en.trimEnd()
    );
    formData.append(
      `dynamic_contents[${contentIndex}][name][km]`,
      content.name.km.trimEnd()
    );
    content.items.forEach((item, itemIndex) => {
      if (itemIndex === 0 && !item.name.en.trim() && !item.name.km.trim()) {
        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][image_src]`,
          ''
        );
        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][name][en]`,
          ''
        );
        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][name][km]`,
          ''
        );

        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][en]`,
          ''
        );
        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][km]`,
          ''
        );
        return;
      }

      if (itemIndex !== 0 && !item.name.en.trim() && !item.name.km.trim())
        return;

      if (item.image.file) {
        formData.append(`dynamic_content_images`, item.image.file as Blob);
      } else {
        formData.append(
          `dynamic_contents[${contentIndex}][items][${itemIndex}][image_src]`,
          item.image.src.trimEnd()
        );
      }

      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][name][en]`,
        item.name.en.trimEnd()
      );
      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][name][km]`,
        item.name.km.trimEnd()
      );

      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][en]`,
        item.detail.en.trimEnd()
      );
      formData.append(
        `dynamic_contents[${contentIndex}][items][${itemIndex}][detail][km]`,
        item.detail.km.trimEnd()
      );
    });
  });

  return formData;
};

export const transformEventForm = (
  data: APIResponseEvent['data']['attributes']
) => {
  return {
    image: { src: data.image_src, file: null },
    name: { en: data.name.en, km: data.name.km },
    type: data.type,
    categories: data.categories,
    detail: data.detail.en,
    date: {
      start_date: format(new Date(data.date.start_date), 'yyyy-MM-dd'),
      end_date: format(new Date(data.date.end_date), 'yyyy-MM-dd'),
    },
    times: data.times.map((time) => ({
      date: new Date(time.date).toISOString(),
      start_time: format(new Date(time.start_time), 'HH:mm'),
      end_time: format(new Date(time.end_time), 'HH:mm'),
    })),
    custom_date: data.times.length > 1,
    locations: data.locations as any,
    schedules: data.schedules.map((schedule) => ({
      date: new Date(schedule.date).toISOString(),
      schedules: schedule.schedules.map((_schedule) => ({
        start_time: format(new Date(_schedule.start_time), 'HH:mm'),
        end_time: format(new Date(_schedule.end_time), 'HH:mm'),
        activity: {
          en: _schedule.activity.en,
          km: _schedule.activity.km,
        },
      })),
    })),
    custom_schedule: data.schedules.length > 1,
    join_methods: data.join_methods as any,
    dynamic_contents: data.dynamic_contents.map((content) => ({
      name: { en: content.name.en, km: content.name.km },
      items: content.items.map((item) => ({
        image: { src: item.image_src, file: null },
        name: { en: item.name.en, km: item.name.km },
        detail: { en: item.detail.en, km: item.detail.km },
      })),
    })),
  };
};
