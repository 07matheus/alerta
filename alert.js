let alert = (function(data) {
  let _ = alert.prototype;

  _.title;
  _.type;
  _.message;
  _.textSuccesButton;
  _.textErrorButton;

  _.init = (dados) => {
    let el = alert.prototype;

    el.setTitle(el, dados.title);

    el.setType(el, dados.type);

    el.setMessage(el, dados.message);

    let dataDefault = {
      text: null,
      action: el.setActionDefault
    }

    el.textSuccesButton = 'Ok';
    dataDefault.text    = el.textSuccesButton;
    if(dados.successButton !== undefined && dados.successButton.text !== undefined) el.textSuccesButton = dados.successButton.text;
    dados.successButton = el.setDataDefault(dados.successButton, dataDefault);

    el.textErrorButton = undefined;
    if(dados.errorButton !== undefined) {
      el.textErrorButton = dados.errorButton.text === undefined ? 'Cancel' : dados.errorButton.text;

      dataDefault.text  = el.textErrorButton;
      dados.errorButton = el.setDataDefault(dados.errorButton, dataDefault);
    }

    el.generateAlert();

    el.setAction('.alert-button-success', dados.successButton);
    el.setAction('.alert-button-error', dados.errorButton);

    el.setAction('.box-alert-button-close', {
      action: ((ob, element) => {
        if(element.classList.contains('box-alert-button-close')) ob.close();
      })
    });
    el.setAction('.alert-background', {
      action: ((ob, element) => {
        if(element.classList.contains('alert-background')) ob.close();
      })
    });

    return el;
  }

  _.setTitle = (ob, title) => {
    ob.title = title === undefined ? 'Alert!' : title;
  }

  _.setType = (ob, type) => {
    let fType = 'success';

    if(type !== undefined && ['success', 'error', 'warning'].includes(type)) fType = type;

    ob.type = fType;
  }

  _.setMessage = (ob, message) => {
    let fMessage = (message === undefined) ? ob.getMessageDefault(ob.type): message;
    ob.message   = fMessage;
  }

  _.getMessageDefault = type => {
    switch(type) {
      case 'success':
        return 'Sent with success!';

      case 'error':
        return 'Error sending.';

      case 'warning':
        return 'Something went wrong, but it was processed.';
    }
  }

  _.generateAlert = () => {
    let el = alert.prototype;

    let htmlAlert = el.createAlert();

    document.querySelector('html').appendChild(htmlAlert);
  }

  _.createAlert = () => {
    let ob = alert.prototype;

    let btnClose = {
      class: 'box-alert-button-close',
      childrens: [
        {
          class: 'alert-button-close-left'
        },
        {
          class: 'alert-button-close-right'
        }
      ]
    };

    let title = {
      class: 'title-alert',
      content: ob.title
    };

    let icon = {
      class: 'box-icon-alert '+ob.type,
      childrens: [
        {
          class: 'icon-alert-'+ob.type,
          childrens: [
            {
              class: 'icon-alert-'+ob.type+'-left'
            },
            {
              class: 'icon-alert-'+ob.type+'-right'
            }
          ]
        }
      ]
    };

    let message = {
      class: 'box-alert-message',
      content: ob.message
    };

    let buttons = [{
      class: 'alert-button-success',
      content: ob.textSuccesButton
    }];
    if(ob.textErrorButton !== undefined) buttons.push({
      class: 'alert-button-error',
      content: ob.textErrorButton
    });
    let boxButtons = {
      class: 'box-alert-buttons',
      childrens: buttons
    }

    let data = {
      class: 'alert-background',
      childrens: [
        {
          class: 'box-alert',
          childrens: [
            btnClose,
            title,
            icon,
            message,
            boxButtons
          ]
        }
      ]
    };

    return ob.createElement(data);
  }

  _.createElement = (data) => {
    let html       = document.createElement('div');
    html.innerHTML = data.content === undefined ? '': data.content;

    data.class.split(' ').forEach(item => html.classList.add(item));

    let children = '';
    if(data.childrens !== undefined) {
      data.childrens.forEach(child => {
        children = alert.prototype.createElement(child);
        html.appendChild(children);
      });
    }    

    return html;
  }

  _.setDataDefault = (data, dataDefault = null) => {
    let datUpdated = {};

    if(data === undefined && dataDefault === null) return null;

    if(data === undefined) {
      datUpdated.text   = dataDefault.text;
      datUpdated.action = dataDefault.action;
    } else {
      datUpdated.text   = data.text !== undefined ? data.text : dataDefault.text;
      datUpdated.action = data.action !== undefined ? data.action : dataDefault.action;
    }

    return datUpdated;
  }

  _.setAction = (targetAttribute, data) => {
    let target  = document.querySelector(targetAttribute);

    if(target === null || data === null) return false;

    let fAction = data.action;
    target.addEventListener('click', target => {
      let el = target.target;
      let ob = alert.prototype;
      
      fAction !== undefined ? fAction(ob, el): ob.setActionDefault(ob);
    })
  }

  _.setActionDefault = (ob) => {
    ob.close();
  }

  _.close = () => document.querySelector('.alert-background').remove();

  return _.init(data);
});