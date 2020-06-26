var chatChosenVisible = false;
var brandColor1 = "#A3FFD1";
var brandColor2 = "#EAF0F8";
var brandTextColor = "#ffffff";

function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

var personalizedColors = {
    darkBlueBackground: "#00AB63",
    whiteText: "#FFFFFF",
    entryPointBackground: "#00AB63",
    lighterBackground: "#ecedf1",
    primaryButtonBackground: "#14aa4b",
    primaryButtonColor: "#FFFFFF",
    secondaryButtonBackground: "#013920",
    secondaryButtonColor: "#FFFFFF"
};

var brandMessageBubbleColors = function (bgColor) {
    return {
      Bubble: {
        background: bgColor,
        color: '#0D111B'
      },
      Avatar: {
        display: 'none',
        background: bgColor,
        color: '#4D5D70'
      },
      Header: {
        color: '#4D5D70'
      }
    }
};

var brandedColors = {
    Chat: {
        MessageListItem: {
            FromOthers: brandMessageBubbleColors(brandColor2),
            FromMe: brandMessageBubbleColors(brandColor1),
        },
        MessageInput: {
            Button: {
              background: '#2FED90',
              color: '#000',
            },
        },
        MessageCanvasTray: {
            Container: {
                background: personalizedColors.darkBlueBackground,
                color: personalizedColors.whiteText
            }
        },
        MainContainer: {
          Container: {
            borderRadius: '12px',
            width: '320px'
          }
        },
    },
    MainHeader: {
      Container: {
        background: personalizedColors.darkBlueBackground,
        color: personalizedColors.whiteText
      },
    },
    EntryPoint: {
      Container: {
        background: personalizedColors.entryPointBackground,
        color: personalizedColors.whiteText
      }
    },
    DynamicForm: {

      Container: {
        borderRadius: '12px',
        width: '320px'
      }
    },
    PreEngagementCanvas: {
      Container: {
        background: '#fff'
      },
      Form: {
        SubmitButton: {
          background: '#2FED90',
          width: '100%',
          color: '#0D111B',
          borderRadius: '32px',
          padding: '12px 16px',
          textTransform: 'capitalize',
          fontWeight: '450',
          fontSize: '16px',
          fontFamily: 'Circular Std',
        }
      }
    }
};

const appConfig = {
  accountSid: "ACd80e76de7da90702a3231f37ae2a3710",
  flexFlowSid: "FO261390d8a51f6988babdb01ee5269c86",
  context: {
    locationOrigin: window.location.origin,
  },
  componentProps: {
    MainHeader: {
      titleText: 'Stone',
      imageUrl: "https://iris-opossum-6117.twil.io/assets/logo-stn.svg"
    },
    PreEngagementCanvas: {
      background: "#ff6384"
    }
  },
  colorTheme: {
    overrides: brandedColors
  },
  context: {
    locationOrigin: window.location.origin,
  },
  startEngagementOnInit: false,
  preEngagementConfig: {    
    description: "Preencha seus dados abaixo para começar seu atendimento",
    fields: [
      {
        label: "Nome Completo",
        type: "InputItem",
        attributes: {
          name: "name",
          type: "text",
          required: true,
          placeholder: 'Insira seu nome completo'
        }
      },
      {
        label: "Celular",
        type: "InputItem",
        attributes: {
          name: "friendlyPhone",
          type: "phone",
          required: true,
          placeholder: 'Insira seu número de celular'
        }
      },
      {
        label: "E-mail",
        type: "InputItem",
        attributes: {
          name: "friendlyEmail",
          type: "email",
          required: true,
        }
      },
      {
        label: "Empresa",
        type: "InputItem",
        attributes: {
          name: "company",
          type: "text",
          required: true,
        }
      },
      {
        label: "Tipo de Cadastro",
        type: "SelectItem",
        attributes:
        {
          name: "customerType",
          required: true,
          readOnly: false,
        },
        options: [
          {
            value: "CPF",
            label: "PF",
            selected: false
          },
          {
            value: "CNPJ",
            label: "PJ",
            selected: false
          },
          {
            value: "MEI",
            label: "MEI",
            selected: false
          },
        ]
      },
      {
        label: "Qual o canal que prefere ser contado?",
        type: "SelectItem",
        attributes:
        {
          name: "contactChannel",
          required: true,
          readOnly: false,
          placeholder: 'Escolha o canal de sua preferência'
        },
        options: [
          {
            value: "Chat",
            label: "chat",
            selected: false
          },
          {
            value: "WhatsApp",
            label: "whatsapp",
            selected: false
          }
        ]
      }
    ],
    submitLabel: "Continuar"
  }
}

// 

const mapHelplineLanguage = helpline => {
  switch (helpline) {
    case 'Fake Helpline':
      return 'dk';
    default:
      return defaultLanguage;
  }
}

function loadJS (url, implementationCode, location, id = "") {
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.id = id;

  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = (
    implementationCode 
    && (document.getElementById('widget-chat').style.visibility = "hidden")
    && (document.getElementById('widget-chat-button').style.visibility = "hidden")
  );

  location.appendChild(scriptTag);
};

function loadTwilioChat() {
  document.getElementById("widget-chat").style.display = "none";

  Twilio.FlexWebChat.createWebChat(appConfig).then(webchat => {
    const { manager } = webchat;
    
    manager.strings = {
      EntryPointTagline: "Fale Conosco",
      MessageCanvasTrayContent: `
        <h6> Obrigado por conversar conosco! </h6>
        <p> Se você tiver mais alguma dúvida, entre em contato novamente. </p> `,
      MessageCanvasTrayButton: "INICIAR NOVO CHAT",
      InvalidPreEngagementMessage: "Os formulários de pré-engajamento não foram definidos e são necessários para iniciar o bate-papo na Web." + "Por favor, configure-os agora na instalação.",
      InvalidPreEngagementButton: "Saiba mais",
      PredefinedChatMessageAuthorName: "Stone",
      PredefinedChatMessageBody: "Olá! Como podemos ajudá-lo hoje?",
      InputPlaceHolder: "Digite mensagem",
      TypingIndicator: "{0} está digitando ...",
      Read: "Lido",
      MessageSendingDisabled: "O envio de mensagens foi desativado",
      Today: "HOJE",
      Yesterday: "Ontem",
      WelcomeMessage: "Bem vindo ao Atendimento Stone, <br> você está sendo atendido por um humano.",
      Save: "SALVAR",
      Reset: "RESET",
      MessageCharacterCountStatus: "{{currentCharCount}} / {{maxCharCount}}",
      SendMessageTooltip: "Enviar mensagem",
      FieldValidationRequiredField: "Campo obrigatório",
      FieldValidationInvalidEmail: "Forneça um endereço de email válido"
    }

    webchat.init();
  });

  Twilio.FlexWebChat.Actions.invokeAction('ToggleChatVisibility');
}

function loadZendeskChat () {
  document.getElementById("widget-chat").style.display = "none";

  zE('webWidget', 'show');
  zE('webWidget', 'open');
}

function openZenDesk () {
  loadJS(
    'https://static.zdassets.com/ekr/snippet.js?key=3b8458ed-30ad-473e-a456-1741cfebac36',
    loadZendeskChat,
    document.body,
    "ze-snippet"
  );
}

function openTwilio () {
  loadJS(
    'https://assets.flex.twilio.com/releases/flex-webchat-ui/2.4.0/twilio-flex-webchat.min.js',
    loadTwilioChat,
    document.body
  );
}

function toggleChatChosen () {
  if (chatChosenVisible) {
    removeClass(document.getElementById('widget-chat'), 'slide-in-bottom');
    addClass(document.getElementById('widget-chat'), 'slide-out-bottom');

    setTimeout( function() {
      document.getElementById('widget-chat').style.display = "none";
    }, 450)
  } else {
    document.getElementById('widget-chat').style.display = "unset";
    removeClass(document.getElementById('widget-chat'), 'slide-out-bottom');
    addClass(document.getElementById('widget-chat'), 'slide-in-bottom');
  }

  chatChosenVisible = !chatChosenVisible;
}

document.querySelector("body").innerHTML += `
  <button onClick="toggleChatChosen()" id="widget-chat-button">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 17C25 17.7072 24.719 18.3855 24.219 18.8856C23.7189 19.3857 23.0406 19.6667 22.3333 19.6667H6.33333L1 25V3.66667C1 2.95942 1.28095 2.28115 1.78105 1.78105C2.28115 1.28095 2.95942 1 3.66667 1H22.3333C23.0406 1 23.7189 1.28095 24.219 1.78105C24.719 2.28115 25 2.95942 25 3.66667V17Z" stroke="#0D111B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <div id="widget-chat" style="opacity: 0;">
    <div class="widget-choose-header">
      <div class="header-logo">
        <svg class="stn-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd" d="M10.4704 20.0572L3.40719 13.0878C2.86427 12.5518 2.86427 11.6834 3.40719 11.1474L10.4704 4.17808C10.8563 3.79765 11.5158 4.06708 11.5158 4.60538V19.6299C11.5158 20.1682 10.8563 20.4376 10.4704 20.0572Z" fill="#14AA4B"/>
          <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd" d="M13.7776 4.0018C13.4145 3.97474 13.1055 4.25643 13.1055 4.60591V7.85885C13.1055 8.15393 13.3258 8.41539 13.6301 8.4547C15.5176 8.69965 16.9724 10.2462 16.9724 12.1175C16.9724 13.9891 15.5176 15.5356 13.6301 15.7803C13.3258 15.8199 13.1055 16.0814 13.1055 16.3762V19.6294C13.1055 19.9789 13.4145 20.2606 13.7776 20.2335C18.1667 19.906 21.6212 16.3975 21.6212 12.1175C21.6212 7.83778 18.1667 4.32934 13.7776 4.0018Z" fill="#14AA4B"/>
        </svg>
        <span>Stone</span>
      </div>
      <div class="close-btn" onClick="toggleChatChosen()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="widget-choose-body">
      <h3>Olá, vamos começar o seu atendimento?</h3>
      <span>Nossos atendentes estão prontos para te atender no que você precisar</span>
      <button class="btn-chat primary" onclick="openTwilio()">Ainda não sou cliente Stone</button>
      <span class="text-info">Atendimento de seg. a sex. das 8 as 20h</span>
      <button class="btn-chat secondary" onclick="openZenDesk()">Já sou cliente Stone</button>
      <span class="text-info">Atendimento 24 horas</span>
    </div>
  </div>
`;
