# Tviso to Trak.tv importer

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
- Replace user and password in cypress/integration/**pending.json**
- Replace user and password in cypress/integration/**watched.json**

```
yarn run cypress open
```

Start with the one you prefer and let the magic happen.

## Tips & Tricks

If it doesn't log in properly, open the console in the cypress browser (F12 and console tab).

This is not a Volkswagen, maybe you have to run multiple times to get the result.

After every successful run, it will appear a file with the titles that was not found in the searches.

After all please check it manually there are names that change a little or have a UK/USA version.
