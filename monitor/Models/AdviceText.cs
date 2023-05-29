using System;
using System.Collections.Generic;

namespace monitor.Models;

public partial class AdviceText
{
    public long AdviceTextId { get; set; }

    public string? Status { get; set; }

    public string? Text { get; set; }

    public virtual ICollection<Advice> Advices { get; } = new List<Advice>();
}
