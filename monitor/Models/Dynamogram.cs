using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace monitor.Models
{

public partial class Dynamogram
{
    public long DynamogramId { get; set; }

    public long? WellId { get; set; }

    public string? Date { get; set; }

    public int? VarQ { get; set; }

    public int? VarPmax { get; set; }

    public int? VarPmin { get; set; }

    public string? TypeDevice { get; set; }

    public int? VarN { get; set; }

    public int? VarL { get; set; }

    public int? VarKpod { get; set; }

    public string? Opinion { get; set; }

    public int? VarG { get; set; }

    public long? UserId { get; set; }

    public int? VarKnap { get; set; }

    public virtual ICollection<Advice> Advices { get; } = new List<Advice>();

    public virtual User? User { get; set; }

    public virtual Well? Well { get; set; }

    }
}