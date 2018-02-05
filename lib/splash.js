import dom from 'vd';

export default function splash({
  path,
  name,
  org,
  coc,
  logo,
  active,
  total,
  channels,
  large,
  iframe,
  gcaptcha_sitekey
}) {
  let div = dom('.splash', !iframe && dom('.logos',
      logo && dom('.logo.org'),
      dom('.logo.slack')
    ),
    dom(`div class="cont"`,
      dom(`div class="earth"`,
        dom(`div class="earth-canvas"`,
          dom(`div id="particles2"`)))),
    dom('p',
      'Join ', dom('b', 'Ælf'),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' on Slack!'
    ),
    dom('p.status',
      active ? [
        dom('b.active', active), ' users online now, out of a total ',
        dom('b.total', total), ' registered users.'
      ] : [dom('b.total', total), ' users are registered so far.']
    ),
    dom('form id=invite',
      channels && (
        channels.length > 1
        // channel selection when there are multiple
        ?
        dom('select.form-item name=channel',
          channels.map(channel => {
            return dom('option', {
              value: channel,
              text: channel
            })
          })
        )
        // otherwise a fixed channel
        :
        dom('input type=hidden name=channel', {
          value: channels[0]
        })
      ),
      dom('input.form-item type=email name=email placeholder=you@yourdomain.com ' +
        (!iframe ? 'autofocus' : '')),
      dom('br'),
      dom(`div class="g-recaptcha" data-sitekey="${gcaptcha_sitekey}"`),
      coc && dom('.coc',
        dom('label',
          dom('input type=checkbox name=coc value=1'),
          'I agree to the ',
          dom('a', {
            href: coc,
            target: '_blank'
          }, 'Code of Conduct'),
          '.'
        )
      ),
      dom('button.loading', 'Get my Invite!')
    ),
    dom('p.signin',
      'or ',
      dom(`a href=https://${org}.slack.com target=_top`, 'sign in'),
      '.'
    ), !iframe && dom('footer',
      'powered by ',
      dom('a href=http://rauchg.com/slackin target=_blank', 'slackin')
    ),
    style({
      logo,
      active,
      large,
      iframe
    }),
    // xxx: single build
    dom('script', `
      data = {};
      data.path = ${JSON.stringify(path)};
    `),
    dom('script src=https://cdn.socket.io/socket.io-1.4.4.js'),
    dom(`script src=${path}assets/superagent.js`),
    dom(`script src=${path}assets/client.js`),
    dom(`script src=${path}assets/three.js`),
    dom(`script src=${path}assets/earth.js`)
  )
  return div
}

const blue = '#00C1FC'

function style({
  logo,
  active,
  large,
  iframe
} = {}) {
  var css = dom.style()
  css.add('html', {
    'font-size': large ? '14px' : '10px'
  })

  css.add('body', {
    'background-image': `url('./assets/bg-01.jpg')`,
    'background-size': '100% 100%'
  })
  css.add('.splash', {
    'width': iframe ? '25rem' : '30rem',
    'margin': iframe ? '0' : '20rem auto',
    'text-align': 'center',
    'font-family': '"Helvetica Neue", Helvetica, Arial',
    'color': '#FFF'
  })


  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#671EAC',
      'overflow': 'hidden', // ff
    })

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '1rem'
    })
  }

  if (!iframe) {
    css
      .media('(max-width: 50rem)')
      .add('.splash', {
        'margin-top': '10rem'
      })
  }

  css.add('.head', {
    'margin-bottom': '4rem'
  })

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '4rem'
  })

  if (!iframe) {
    css.add('.logo', {
      'width': '15rem',
      'height': '5.0rem',
      'display': 'inline-block',
      'background-repeat': 'no-repeat',
      'background-size': '100% auto, contain',
      'background-position': 'center',
    })

    css.add('.logo.slack', {
      'transform': 'translateX(2rem)',
      'background-image': 'url(assets/slack_logo.png)',
    })

    if (logo) {
      let pw = 5 // '+' width in rem
      let lp = 3 // logos separation in rem

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'width': '1rem',
      })

      css.add('.logo.org', {
        'background-image': `url(assets/aelf_logo.png)`,
        'transform': 'translateX(-2rem)',
      })
    }
  }

  css.add('.coc', {
    'font-size': '1.2rem',
    padding: '1.5rem 0 .5rem',
    color: '#666'
  })

  if (iframe) {
    css.add('.coc', {
      'font-size': '1.1rem',
      'padding-top': '1rem'
    })

    css.add('.coc input', {
      position: 'relative',
      top: '-.2rem'
    })
  }

  css.add('.coc label', {
    cursor: 'pointer'
  })

  css.add('.coc input', {
    'appearance': 'none',
    '-webkit-appearance': 'none',
    border: 'none',
    'vertical-align': 'middle',
    margin: '0 .5rem 0 0'
  })

  css.add('.coc input::after', {
    content: '""',
    display: 'inline-block',
    width: '1.5rem',
    height: '1.5rem',
    'vertical-align': 'middle',
    background: 'url(/assets/checkbox.svg)',
    cursor: 'pointer'
  })

  css.add('.coc input:checked::after', {
    'background-position': 'right'
  })

  css.add('.coc a', {
    color: '#666'
  })

  css.add('.coc a:hover', {
    'background-color': '#666',
    'text-decoration': 'none',
    color: '#fff'
  })

  css.add('p', {
    'font-size': iframe ? '1.2rem' : '1.5rem',
    'margin': iframe ? '0 0 .5rem' : '.5rem 0'
  })

  if (iframe) {
    css.add('p.status', {
      'font-size': '1.1rem'
    })
  }

  css.add('select', {
    'background': 'none'
  })

  css.add('button, .form-item', {
    'font-size': '1.2rem',
    'margin-top': iframe ? '.5rem' : '1rem',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%',
    'padding': '.9rem'
  })

  css.add('button', {
    'color': '#fff',
    'font-weight': 'bold',
    'border-width': 0,
    'background': blue,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in'
  })

  css.add('button.loading', {
    'pointer-events': 'none'
  })

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  })

  css.add('button.error', {
    'background-color': 'FF0DE5',
    'text-transform': 'none'
  })

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#68C200'
  })

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F'
  })

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  })

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  })

  css.add('form', {
    'margin-top': iframe ? '1rem' : '2rem',
    'margin-bottom': '0'
  })

  css.add('input', {
    'color': '#9B9B9B',
    'border': '.1rem solid #D6D6D6'
  })

  if (iframe) {
    css.add('button, .form-item', {
      'height': '2.8rem',
      'line-height': '2.8rem',
      'padding': 0,
      'font-size': '1.1rem'
    })
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  })

  if (active) {
    css.add('.active', {
      'color': blue
    })
  }

  css.add('p.signin', {
    'padding': '1rem 0 1rem',
    'font-size': '1.1rem'
  })

  css.add('p.signin a', {
    'color': blue,
    'text-decoration': 'none'
  })

  css.add('p.signin a:hover', {
    'background-color': '#00C1FC',
    color: '#fff'
  })
  css.add('.cont', {
    'z - index': '2',
    'position': 'absolute',
    'top': '0',
    'right': '0',
    'bottom': '0',
    'left': '0',
    'z-index': '-1'
  })
  css.add('.earth', {
    'position': 'absolute',
    'top': '-12%',
    'right': '0',
    'bottom': '0',
    'left': '0',
    'z-index': '-1',
    'background-size': 'auto',
    'background-position': 'center',
    'background-repeat': 'no-repeat'
  })

  css.add('.earth .earth-canvas', {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%'
  })

  css.add('.earth .earth-canvas', {
    'z-index': '-1'
  })

  css.add('.earth .earth-canvas #particles2', {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'z-index': '-1'
  })

  css.add('.earth .earth-canvas .point-ani2', {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    '-webkit-transform': 'translate(-50%, -50%)',
    '-moz-transform': 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    'transform': 'translate(-50%, -50%)'
  })
  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '1.1rem',
      'margin': '20rem auto 0',
      'width': '30rem',
      'text-align': 'center'
    })

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
      'border-bottom': '.1rem solid #9B9B9B'
    })

    css.add('footer a:hover', {
      'color': '#fff',
      'background-color': '#9B9B9B'
    })
  }

  if (iframe) {
    css.add('.g-recaptcha', {
      'transform': 'scale(0.76)',
      'transform-origin': '0 0',
    })
  }

  return css
}
