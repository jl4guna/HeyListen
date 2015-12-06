function onDeviceReady() {
      var myHostToObserve = "www.viriapis.com/";
      
      document.removeEventListener('deviceready', onDeviceReady, false);
      
      document.addEventListener(connectivity.events.onReachabilityChanged, onReachabilityChanged, false)
      connectivity.observeRemoteHostName(myHostToObserve);
    }
    
    function onReachabilityChanged(e) {
      console.log(e.interface);
      swich(e.interface) {
        case connectivity.DISCONNECTED:
          console.log('DISCONNECTED');
          break;
        case WIFI:
          console.log('WIFI');
          break;
        case WIMAX:
          console.log('WIMAX');
          break;
        case ETHERNET:
          console.log('ETHERNET');
          break;
        case MOBILE:
          console.log('MOBILE');
          break;
        case UNDEFINED:
          console.log('UNDEFINED');
          break;
      }
      
      if (e.connected) {
        console.log("Is connected");
      } else {
        console.log("Is not connected");
      }
      
      swich(e.observer) {
        case HOST:
          console.log('HOST');
          break;
        case INTERNET:
          console.log('INTERNET');
          break;
        case LOCALWIFI:
          console.log('LOCALWIFI');
          break;
      }
    }