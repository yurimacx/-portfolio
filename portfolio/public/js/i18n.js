'use strict';
const D = {
  pt: {
    'page.title': 'Portfólio | Sites e aplicativos',
    'nav.home': 'Início', 'nav.craft': 'Ofício', 'nav.gallery': 'Galeria', 'nav.projects': 'Projetos', 'nav.contact': 'Contato',
    'hero.title': 'Sites e aplicativos\nconstruídos para durar',
    'hero.text': 'Front end, back end, banco de dados e nuvem, com segurança desde o primeiro commit.',
    'hero.cta': 'Ver projetos', 'hero.alt': 'Escultura clássica de mármore iluminada contra fundo escuro',
    'craft.title': 'O ofício', 'craft.lead': 'Cada projeto começa pela estrutura: forma clara, proporção certa e nada que não precise estar ali.',
    'craft.web.t': 'Sites e aplicações web', 'craft.web.d': 'Interfaces rápidas, responsivas e acessíveis, do layout ao código.',
    'craft.app.t': 'Aplicativos', 'craft.app.d': 'Apps para celular e web, integrados a APIs e bancos de dados.',
    'craft.cloud.t': 'Back end e nuvem', 'craft.cloud.d': 'APIs, bancos de dados e implantação em nuvem prontos para crescer.',
    'craft.sec.t': 'Segurança', 'craft.sec.d': 'Autenticação, validação de dados e proteção contra ataques comuns desde o início.',
    'david.alt': 'Detalhe do rosto e dos cachos de uma escultura clássica',
    'gallery.title': 'Galeria', 'gallery.text': 'Esculturas clássicas que inspiram o meu trabalho: forma, proporção e luz.',
    'projects.title': 'Projetos', 'projects.loading': 'Carregando projetos…', 'projects.empty': 'Nenhum projeto publicado ainda.',
    'projects.error': 'Não foi possível carregar os projetos. Recarregue a página.', 'projects.open': 'Abrir projeto',
    'contact.title': 'Contato', 'contact.name': 'Nome', 'contact.email': 'E-mail', 'contact.msg': 'Mensagem', 'contact.send': 'Enviar mensagem',
    'contact.ok': 'Mensagem enviada. Respondo em breve.', 'contact.fail': 'Verifique os campos e tente de novo.',
  },
  en: {
    'page.title': 'Portfolio | Websites and apps',
    'nav.home': 'Home', 'nav.craft': 'Craft', 'nav.gallery': 'Gallery', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
    'hero.title': 'Websites and apps\nbuilt to last',
    'hero.text': 'Front end, back end, databases and cloud, with security from the first commit.',
    'hero.cta': 'View projects', 'hero.alt': 'Classical marble sculpture lit against a dark background',
    'craft.title': 'The craft', 'craft.lead': "Every project starts with structure: clear form, right proportions, and nothing that doesn't belong.",
    'craft.web.t': 'Websites and web apps', 'craft.web.d': 'Fast, responsive, accessible interfaces, from layout to code.',
    'craft.app.t': 'Apps', 'craft.app.d': 'Mobile and web apps connected to APIs and databases.',
    'craft.cloud.t': 'Back end and cloud', 'craft.cloud.d': 'APIs, databases and cloud deployment, ready to scale.',
    'craft.sec.t': 'Security', 'craft.sec.d': 'Authentication, data validation and protection against common attacks from the start.',
    'david.alt': 'Detail of the face and curls of a classical sculpture',
    'gallery.title': 'Gallery', 'gallery.text': 'Classical sculptures that inspire my work: form, proportion and light.',
    'projects.title': 'Projects', 'projects.loading': 'Loading projects…', 'projects.empty': 'No projects published yet.',
    'projects.error': "Couldn't load the projects. Reload the page.", 'projects.open': 'Open project',
    'contact.title': 'Contact', 'contact.name': 'Name', 'contact.email': 'Email', 'contact.msg': 'Message', 'contact.send': 'Send message',
    'contact.ok': "Message sent. I'll reply soon.", 'contact.fail': 'Check the fields and try again.',
  },
  it: {
    'page.title': 'Portfolio | Siti e applicazioni',
    'nav.home': 'Inizio', 'nav.craft': 'Mestiere', 'nav.gallery': 'Galleria', 'nav.projects': 'Progetti', 'nav.contact': 'Contatti',
    'hero.title': 'Siti e applicazioni\ncostruiti per durare',
    'hero.text': 'Front end, back end, database e cloud, con la sicurezza fin dal primo commit.',
    'hero.cta': 'Vedi i progetti', 'hero.alt': 'Scultura classica in marmo illuminata su fondo scuro',
    'craft.title': 'Il mestiere', 'craft.lead': 'Ogni progetto parte dalla struttura: forma chiara, giuste proporzioni e nulla di superfluo.',
    'craft.web.t': 'Siti e applicazioni web', 'craft.web.d': 'Interfacce veloci, responsive e accessibili, dal layout al codice.',
    'craft.app.t': 'Applicazioni', 'craft.app.d': 'App per mobile e web, integrate con API e database.',
    'craft.cloud.t': 'Back end e cloud', 'craft.cloud.d': 'API, database e distribuzione in cloud pronti a crescere.',
    'craft.sec.t': 'Sicurezza', 'craft.sec.d': "Autenticazione, validazione dei dati e protezione dagli attacchi comuni fin dall'inizio.",
    'david.alt': 'Dettaglio del volto e dei riccioli di una scultura classica',
    'gallery.title': 'Galleria', 'gallery.text': 'Sculture classiche che ispirano il mio lavoro: forma, proporzione e luce.',
    'projects.title': 'Progetti', 'projects.loading': 'Caricamento dei progetti…', 'projects.empty': 'Nessun progetto pubblicato.',
    'projects.error': 'Impossibile caricare i progetti. Ricarica la pagina.', 'projects.open': 'Apri il progetto',
    'contact.title': 'Contatti', 'contact.name': 'Nome', 'contact.email': 'E-mail', 'contact.msg': 'Messaggio', 'contact.send': 'Invia messaggio',
    'contact.ok': 'Messaggio inviato. Risponderò presto.', 'contact.fail': 'Controlla i campi e riprova.',
  },
  el: {
    'page.title': 'Portfolio | Ιστότοποι και εφαρμογές',
    'nav.home': 'Αρχική', 'nav.craft': 'Τέχνη', 'nav.gallery': 'Γκαλερί', 'nav.projects': 'Έργα', 'nav.contact': 'Επικοινωνία',
    'hero.title': 'Ιστότοποι και εφαρμογές\nφτιαγμένες να διαρκούν',
    'hero.text': 'Front end, back end, βάσεις δεδομένων και cloud, με ασφάλεια από το πρώτο commit.',
    'hero.cta': 'Δείτε τα έργα', 'hero.alt': 'Κλασικό μαρμάρινο γλυπτό φωτισμένο σε σκούρο φόντο',
    'craft.title': 'Η τέχνη', 'craft.lead': 'Κάθε έργο ξεκινά από τη δομή: καθαρή φόρμα, σωστές αναλογίες και τίποτα περιττό.',
    'craft.web.t': 'Ιστότοποι και web εφαρμογές', 'craft.web.d': 'Γρήγορες, προσαρμοστικές και προσβάσιμες διεπαφές, από το σχέδιο έως τον κώδικα.',
    'craft.app.t': 'Εφαρμογές', 'craft.app.d': 'Εφαρμογές για κινητά και web, συνδεδεμένες με API και βάσεις δεδομένων.',
    'craft.cloud.t': 'Back end και cloud', 'craft.cloud.d': 'API, βάσεις δεδομένων και ανάπτυξη στο cloud, έτοιμα να μεγαλώσουν.',
    'craft.sec.t': 'Ασφάλεια', 'craft.sec.d': 'Ταυτοποίηση, επικύρωση δεδομένων και προστασία από συνηθισμένες επιθέσεις από την αρχή.',
    'david.alt': 'Λεπτομέρεια προσώπου και μπούκλες κλασικού γλυπτού',
    'gallery.title': 'Γκαλερί', 'gallery.text': 'Κλασικά γλυπτά που εμπνέουν τη δουλειά μου: φόρμα, αναλογία και φως.',
    'projects.title': 'Έργα', 'projects.loading': 'Φόρτωση έργων…', 'projects.empty': 'Δεν έχουν δημοσιευτεί έργα ακόμη.',
    'projects.error': 'Δεν ήταν δυνατή η φόρτωση των έργων. Ανανεώστε τη σελίδα.', 'projects.open': 'Άνοιγμα έργου',
    'contact.title': 'Επικοινωνία', 'contact.name': 'Όνομα', 'contact.email': 'Email', 'contact.msg': 'Μήνυμα', 'contact.send': 'Αποστολή μηνύματος',
    'contact.ok': 'Το μήνυμα στάλθηκε. Θα απαντήσω σύντομα.', 'contact.fail': 'Ελέγξτε τα πεδία και δοκιμάστε ξανά.',
  },
};
const HTML_LANG = { pt: 'pt-BR', en: 'en', it: 'it', el: 'el' };
let cur = 'pt';
try { const s = localStorage.getItem('lang'); if (D[s]) cur = s; } catch { /* sem storage: mantém pt */ }

function t(k) { return D[cur][k] ?? D.pt[k] ?? k; }
function applyLang() {
  document.documentElement.lang = HTML_LANG[cur];
  document.title = t('page.title');
  document.querySelectorAll('[data-i18n]').forEach((e) => { e.textContent = t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-alt]').forEach((e) => { e.alt = t(e.dataset.i18nAlt); });
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === cur)));
}
document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
  cur = b.dataset.lang;
  try { localStorage.setItem('lang', cur); } catch { /* ignora */ }
  applyLang();
}));
applyLang();
