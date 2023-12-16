namespace Scraping.Models
{
    public class Drink
    {
        public string? Category { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Drink> Drinks { get; set; } = new List<Drink>();
    }
}
