using Microsoft.AspNetCore.Mvc;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Scraping.Models;
using System.Xml.Linq;

namespace Scraping.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ScrapController : ControllerBase
    {
        private readonly IWebDriver driver; 
        public ScrapController() 
            => this.driver = new ChromeDriver(); 

        [HttpPost] 
        public async Task<IActionResult> Webscraping([FromBody] BindingModel value)
        {
            //if (string.IsNullOrEmpty(value.Webaddress))
            //    throw new ArgumentNullException(nameof(value));

            var result = new Drink();
            try
            {
                driver.Navigate().GoToUrl(value.Webaddress); 
                var mainDrinks = driver.FindElements(By.XPath("/html/body/div[2]/div/div[2]/div[1]/div[1]/div/div"));
             
                foreach (var title in mainDrinks)
                {
                    var categories = title.FindElements(By.ClassName("nav-subcategory__content"))
                        .Select(x => new Drink { Category = x.Text }).ToList();

                    result.Drinks.AddRange(categories);
                }
                Thread.Sleep(5000);

                driver.Navigate().GoToUrl("https://www.kolichka.bg/c411-bezalkoholni-napitki");
                var nonAlchoholDrinks = driver.FindElements(By.XPath("/html/body/div[2]/div/div[2]/div[1]/div[1]"));

                foreach (var title in nonAlchoholDrinks)
                {
                    var subCategories = title.FindElements(By.ClassName("nav-subcategory__content"))
                        .Select(x => new Drink { Category = x.Text }).ToList();

                    result.Drinks[0].Drinks.AddRange(subCategories);
                }

                Thread.Sleep(5000);

                driver.Navigate().GoToUrl("https://www.kolichka.bg/c421-gazirani-napitki");
                var carbonated = driver.FindElements(By.XPath("/html/body/div[2]/div/div[2]/div[1]/div[1]"));

                foreach (var title in carbonated)
                {
                    var subCategories = title.FindElements(By.ClassName("nav-subcategory__content"))
                            .Select(x => new Drink { Category = x.Text }).ToList();

                    result.Drinks[0].Drinks[0].Drinks.AddRange(subCategories);
                }

                Thread.Sleep(5000);

                driver.Navigate().GoToUrl("https://www.kolichka.bg/c426-kola");
                // var cockeCola = driver.FindElements(By.XPath("/html/body/div[2]/div/div[2]"));

                IList<IWebElement> all = driver.FindElements(By.TagName("article"));

                String[] allText = new String[all.Count];
                int i = 0;
                foreach (IWebElement element in all)
                {
                    allText[i++] = element.Text;

                    var name = element.Text.Split("\r\n")[0];
                    var price = element.Text.Split("\r\n")[2];

                    result.Drinks[0].Drinks[0].Drinks[0].Products.Add(new Product(name, price));
                }
            }
            catch (Exception ex)
            {
                StatusCode(500, $"Error {ex}");
            } 

            return Ok(result);
        }
    }
}
