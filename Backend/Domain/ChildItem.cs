namespace Domain
{
    public sealed class ChildItem : BaseClass {
        public string Name { get; set; }
        public int Order { get; set; }
        public ParentItem Parent { get; set; }
        public long ParentId { get; set; }
    }
}