using AngularJsWithBladeModels.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kovai.ServiceBus360.Common.Countries
{
    public static class CountryModel
    {
        public static List<Country> GetCountries()
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Countries");
            if (!Directory.Exists(path))
                path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin\\Countries");

            var reader = new StreamReader(File.OpenRead(Path.Combine(path, "CountryList.csv")));
            string[] columns = null;
            List<Country> countries = new List<Country>();
            while (!reader.EndOfStream)
            {
                if (columns != null)
                {
                    var values = reader.ReadLine().Split(',');
                    Country country = new Country();
                    for (int i = 0; i < columns.Length; i++)
                    {
                        country.GetType().GetProperty(columns[i]).SetValue(country, values[i], null);
                    }
                    countries.Add(country);
                }
                else
                    columns = reader.ReadLine().Split(',');
            }
            return countries;
        }
    }
}