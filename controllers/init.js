//in order
$('body').prepend(loader);
$('#page-loader').after(start);
$('#hs-container').prepend(sideTpl);
$('#aside').after(profileTpl);
$('#hs-menu').after(toTop);
$('.hs-content-scroller').prepend(headerTpl);
$('.hs-content-wrapper').prepend(aboutTpl);
$('#aboutInfo').prepend(aboutCardTpl);
$('#section1').after(resumeTpl);
$('#section2').after(servicesTpl);
$('#section3').after(processTpl);
$('#section4').after(skillsTpl);
$('#section5').after(portfolioTpl);
$('#section6').after(contactTpl);

Tempo.prepare("aside").render(aside);
Tempo.prepare("profile", {"escape": true}).render(profile);
Tempo.prepare("nav").render(navigation);
Tempo.prepare("social").render(social);
Tempo.prepare("marquee").render(news);
Tempo.prepare("aboutCard").render(aboutCard);
Tempo.prepare("myTab").render(aboutTab);
Tempo.prepare("facts").render(aboutFacts);
Tempo.prepare("bio").render(aboutBio);
Tempo.prepare("hobbies").render(aboutHobbies);
Tempo.prepare("edu").render(resumeEdu);
Tempo.prepare("exp").render(resumeExp);
Tempo.prepare("services").render(services);
Tempo.prepare("testimonials").render(testimonials);
Tempo.prepare("progressbar").render(progressbar);
Tempo.prepare("progresscon").render(progresscon);
Tempo.prepare("team").render(team);
Tempo.prepare("skills").render(skills);
Tempo.prepare("portfolio").render(portfolio);
Tempo.prepare("contact").render(contact);

$('#skills').prepend(skl);