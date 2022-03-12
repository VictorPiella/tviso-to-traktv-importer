# Tviso to Trak.tv importer

###### Disclamation: watched titles take a lot of tries because the cypress browser stops, but that's the best it can do. You have the trakt API open but you need the correct title name and I think you can only mark as viewed, not the date or your rating.

Well well well, I used to use Tviso for tracking my series and movies. These came from old and hacky serliesly. But focus on topic, I need an app for mobile and Tviso’s not working at the moment. [Trak.tv](http://trak.tv/) doesn’t have but seems a standard, I can integrate it in my HomeAssistant, Unraid, Radar and bla bla ...

Step one export your database from Tviso in JSON and saved as code

```
tviso.json
```

Then download this repo

[https://github.com/VictorPiella/tviso-to-traktv-importer](https://github.com/VictorPiella/tviso-to-traktv-importer)

Enter to the folder and

```
yarn install
```

- Replace the **tviso.json** file with your **tviso.json**
- Replace user and password in cypress/integration/**pending.js**
- Replace user and password in cypress/integration/**watched.js**
- Replace user and password in cypress/integration/**zzClickMeWhenCrash.js**

```
yarn run cypress open
```

Start with the one you prefer and let the magic happen.

# Tips & Tricks important to read

If it doesn't log in properly, open the console in the cypress browser (F12 and console tab).

This is not a Volkswagen, maybe you have to run multiple times to get the result.

After each successful execution, a file will appear with the titles that were not found in the searches.

| pendingNoFounds.json | watchedNoFound.json |
| -------------------- |:-------------------:|

After all please check manually there are names that change a bit or have a UK/USA version.

## How I did it: 

Manually search for the titles indicating pendingNoFounds.json and watchedNoFound.json.

After that, rename the tviso.json to the correct name.

I was also looking during the automation and if I found any that had the wrong name I renamed them in the **tviso.json.** Then the next iteration would add them. Finally you have to remember to delete the wrong displays in traktv ,manually.
Finally and very important after every **watched.js** crash you should run **zzClickMeWhenCrash.js** which updates the progress. Once done you can run the watched again.
