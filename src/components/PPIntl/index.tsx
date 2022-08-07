// import React from 'react';
import { useIntl } from 'umi';

export const IntlInitJsx = (page: string) => {
  const useintl = useIntl();
  // const intlJsx = (id?: string, pageName?: string) => {
  //   const prefix = props.pageName != undefined ? props.pageName : page;
  //   const name = props.id != undefined && props.id.length != 0 ? prefix + '.' + props.id : prefix;
  //   return <div>{useintl.formatMessage({ id: name })}</div>;
  // };
  // return intlJsx;
  return (id: string, pageName: string = page) => {
    const intlId = id == undefined || id == '' ? pageName : pageName + '.' + id;
    return <div data-test-id={intlId}>{useintl.formatMessage({ id: intlId })}</div>;
    // if (id == '') return useintl.formatMessage({ id: pageName });
    // return useintl.formatMessage({ id: pageName + '.' + id });
  };
};
