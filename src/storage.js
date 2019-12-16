export const LSCtrl = (function() {
   return {
      get: function(lsName) {
         return JSON.parse(localStorage.getItem(lsName)) || [];
      },
      set: function(lsName, items) {
         return localStorage.setItem(lsName, JSON.stringify(items));
      }
   } 
})();