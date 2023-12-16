using System.ComponentModel.DataAnnotations;

namespace Scraping.Models
{
    public class BindingModel
    {
        //[Url(ErrorMessage = "Please enter a valid URL")]
        public string Webaddress { get; set; }
    }
}
