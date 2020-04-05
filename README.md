Live version: https://nifty-goldstine-e4ea2b.netlify.com

Test Account:
- test@test.com
- test123





pytania odnoście projektu:

1. Elementy takie jak threads i users pobieraja sie z firebase stopniowo przez co funkcja filter oraz useffect 
odpalaja sie za kadym razem, gdy nowe elementy sie doladuja, przez co nastepuje rerender, i firebase wysyła 
całą mase zapytań przez to. jakiś inny sposób?

2. W komponentach, które pobierają elementy z firebase takich jak ContentPage i przekazywane do ContentTemplate.js,
PropTypes dla elementów pobieranych z firebase są najpierw undefined i dopiero po tym zamieniaja sie na propsa z
wartoscia, dlatego w kazdym potrzbny byl deafultProps, tak powinno byc?

3. Zamiast uzywania redux-firebase, nie lepiej byloby reduxa pominac?

4. loggedUser wskazuje na usera, który jest zalogowany. Nie lepiej byłoby przekazywać go w MainTemplate w Context API?

5. W   templates/DetailsThread.js   komentarze są w pobierane od DetailsPage WSZYSTKIE NA RAZ, oraz dopiero wtedy filtrowane i wyświetlane tylko te potrzebne do danego threadu -> Jak to wpływa na szybkość aplikacji i jakie są lepsze sposoby?

6. Jak dodać stories dla elementów z firebase i routerem??

7. Dla komponentu atoms/Heading w konsoli pojawia się taki błąd:
Warning: Received `true` for a non-boolean attribute `boldtext`.
Pokazuje się gdy przekazuje dla elementu boldtext w ten sposob <Heading boldtext>some text</Heading>

8. W molecules/ProfileForm przekazywanie obrazka do firestore jest dobrze zrobione?
Lepiej w firestore trzymac avatary jako pobrany za pomocą .getDownloadURL() juz długi src, czy raczej
trzymać w snapshot.metadata.fullPath i w aplikacji tam gdzie potrzebne pobierać za pomocą .getDownloadURL()?

9. Tagi są trzymane w Sidebar.js, lepiej moze przeniesc je gdzies indziej?
