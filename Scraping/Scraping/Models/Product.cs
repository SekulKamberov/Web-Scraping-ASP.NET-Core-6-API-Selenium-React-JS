namespace Scraping.Models
{
    public class Product
    {
        public string? Name { get; set; }
        public string? Price { get; set; } 
        public Product(string n, string p) { this.Name = n; this.Price = p; }
    }
}
