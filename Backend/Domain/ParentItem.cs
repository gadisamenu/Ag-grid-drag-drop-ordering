namespace Domain
{
    public sealed class ParentItem : BaseClass
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public int ChildCount { get; set; } = 0;
    }
}