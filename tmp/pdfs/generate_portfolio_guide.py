from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    Flowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = "output/pdf/mapa-de-manutencao-portfolio.pdf"


class AccentLine(Flowable):
    def __init__(self, width=15.8 * cm, height=0.08 * cm, color=colors.HexColor("#14b8a6")):
        super().__init__()
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.width, self.height, 2, fill=1, stroke=0)


def bullet_items(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        bulletFontName="Helvetica",
        bulletFontSize=7,
        leftIndent=14,
        spaceBefore=2,
        spaceAfter=5,
    )


def numbered_items(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="1",
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        leftIndent=18,
        spaceBefore=2,
        spaceAfter=5,
    )


def code_block(text, style):
    rows = [[Paragraph(escape(line).replace(" ", "&nbsp;"), style)] for line in text.strip().splitlines()]
    table = Table(rows, colWidths=[15.7 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#08111f")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#1f3b4d")),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def add_section(story, title, styles):
    story.append(Spacer(1, 0.26 * cm))
    story.append(Paragraph(title, styles["Section"]))
    story.append(AccentLine(width=2.4 * cm, height=0.05 * cm))
    story.append(Spacer(1, 0.18 * cm))


def add_table(story, data, widths, styles):
    table = Table(
        [[Paragraph(str(cell), styles["TableHead" if row_index == 0 else "TableCell"]) for cell in row] for row_index, row in enumerate(data)],
        colWidths=widths,
        repeatRows=1,
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f8fafc")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(table)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(2 * cm, 1.15 * cm, "Mapa de manutencao - Portfolio Alberto MV Domingos")
    canvas.drawRightString(19 * cm, 1.15 * cm, f"Pagina {doc.page}")
    canvas.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=1.65 * cm,
        bottomMargin=1.65 * cm,
        title="Mapa de manutencao do portfolio",
        author="Codex",
    )

    base = getSampleStyleSheet()
    styles = {
        "Title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=27,
            textColor=colors.HexColor("#0f172a"),
            spaceAfter=8,
            alignment=TA_LEFT,
        ),
        "Subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=14.8,
            textColor=colors.HexColor("#475569"),
            spaceAfter=12,
        ),
        "Section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=15,
            leading=19,
            textColor=colors.HexColor("#0f172a"),
            spaceAfter=3,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13.1,
            textColor=colors.HexColor("#263241"),
            spaceAfter=7,
        ),
        "Small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=11.3,
            textColor=colors.HexColor("#475569"),
            spaceAfter=5,
        ),
        "Code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="Courier",
            fontSize=7.4,
            leading=9.8,
            textColor=colors.HexColor("#d8fff8"),
        ),
        "TableHead": ParagraphStyle(
            "TableHead",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.4,
            leading=9.8,
            textColor=colors.white,
        ),
        "TableCell": ParagraphStyle(
            "TableCell",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=9.7,
            textColor=colors.HexColor("#263241"),
        ),
    }

    story = []
    story.append(Paragraph("Mapa de manutencao do portfolio", styles["Title"]))
    story.append(
        Paragraph(
            "Guia pratico para alterar textos, links, imagens, tecnologias, projetos e publicar o portfolio Next.js. "
            "Projeto local: C:\\Users\\Dell\\Desktop\\Portfolio.",
            styles["Subtitle"],
        )
    )
    story.append(AccentLine())
    story.append(Spacer(1, 0.32 * cm))

    add_section(story, "1. Visao geral do projeto", styles)
    add_table(
        story,
        [
            ["Area", "Ficheiro ou pasta", "Para que serve"],
            ["Dados do portfolio", "src/data/portfolio.ts", "Nome, bio, links, educacao, competencias, projetos, servicos e tecnologias."],
            ["Secoes visuais", "src/components/content-sections.tsx", "Como cada secao e cartao aparece no site."],
            ["Hero inicial", "src/components/hero-section.tsx", "Primeira dobra do site, foto, chamada principal e estatisticas."],
            ["Estilos globais", "src/app/globals.css e tailwind.config.ts", "Cores, fontes, espaçamentos e utilitarios Tailwind."],
            ["Imagens publicas", "public/", "Tudo aqui pode ser usado no site com caminho iniciado por /."],
            ["PDFs finais", "output/pdf/", "Guias e documentos gerados para consulta."],
        ],
        [3.1 * cm, 5.1 * cm, 7.5 * cm],
        styles,
    )

    add_section(story, "2. Imagens dos projetos", styles)
    story.append(
        Paragraph(
            "As imagens atuais foram ligadas aos projetos usando o campo image em src/data/portfolio.ts.",
            styles["Body"],
        )
    )
    add_table(
        story,
        [
            ["Projeto", "Imagem usada"],
            ["Sistema de Gerenciamento Hospitalar", "public/Sistema de Gerenciamento Hospitalar.png"],
            ["Sistema de Gerenciamento de Esquadra Policial", "public/Sistema de Gerenciamento de Esquadra Policial.png"],
            ["Sistema de Gestao Universitaria Inteligente", "public/Sistema de Gestão Universitária Inteligente.png"],
        ],
        [7.5 * cm, 8.2 * cm],
        styles,
    )
    story.append(Spacer(1, 0.16 * cm))
    story.append(Paragraph("Para trocar uma imagem de um projeto:", styles["Body"]))
    story.append(
        numbered_items(
            [
                "Coloca a nova imagem dentro da pasta public.",
                "Usa um nome simples, por exemplo hospital-dashboard.png.",
                "Abre src/data/portfolio.ts.",
                "No projeto desejado, altera image para o caminho iniciado por barra.",
                "Salva e recarrega o site.",
            ],
            styles["Body"],
        )
    )
    story.append(code_block('image: "/hospital-dashboard.png",', styles["Code"]))

    story.append(PageBreak())
    add_section(story, "3. Adicionar um novo projeto", styles)
    story.append(Paragraph("Copia este bloco para dentro do array projects em src/data/portfolio.ts:", styles["Body"]))
    story.append(
        code_block(
            """{
  name: "Nome do Projeto",
  description: "Resumo curto do que o sistema faz.",
  image: "/nome-da-imagem.png",
  features: ["Modulo 1", "Modulo 2", "Relatorios", "Utilizadores"],
  technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
  demoUrl: "#",
  githubUrl: "https://github.com/teu-usuario/repositorio",
  projectUrl: "#"
},""",
            styles["Code"],
        )
    )
    story.append(
        Paragraph(
            "Mantem a virgula depois do bloco quando ainda existirem outros projetos abaixo. "
            "Se nao tiveres demo ou pagina publica, deixa # temporariamente.",
            styles["Body"],
        )
    )

    add_section(story, "4. Alteracoes comuns", styles)
    add_table(
        story,
        [
            ["Quero alterar", "Onde mexer", "Campo ou detalhe"],
            ["Nome, profissao e descricao", "src/data/portfolio.ts", "siteConfig.name, role, description"],
            ["Email e redes sociais", "src/data/portfolio.ts", "siteConfig.email e siteConfig.socials"],
            ["Itens do menu", "src/data/portfolio.ts", "navItems"],
            ["Numeros do hero", "src/data/portfolio.ts", "stats"],
            ["Texto sobre mim", "src/components/content-sections.tsx", "AboutSection"],
            ["Educacao", "src/data/portfolio.ts", "education"],
            ["Competencias", "src/data/portfolio.ts", "skills"],
            ["Servicos", "src/data/portfolio.ts", "services"],
            ["Tecnologias", "src/data/portfolio.ts", "technologies"],
            ["Capa de projeto", "src/data/portfolio.ts e public/", "project.image"],
            ["Layout dos cards", "src/components/content-sections.tsx", "ProjectsSection e ProjectCover"],
        ],
        [4.2 * cm, 5.5 * cm, 6.0 * cm],
        styles,
    )

    story.append(PageBreak())
    story.append(Paragraph("Mapa de manutencao do portfolio", styles["Title"]))
    story.append(Paragraph("Continuação do guia pratico para evoluir o projeto com seguranca.", styles["Subtitle"]))
    story.append(AccentLine())

    add_section(story, "5. Links de cada projeto", styles)
    story.append(
        bullet_items(
            [
                "demoUrl controla o botao Demo.",
                "githubUrl controla o botao com icone GitHub.",
                "projectUrl controla o botao externo.",
                "Usa target externo apenas se o componente for alterado para abrir em nova aba.",
                "Evita deixar links quebrados em producao; se ainda nao existir link, usa #.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "6. Rodar e testar localmente", styles)
    story.append(Paragraph("No PowerShell, dentro da pasta do projeto:", styles["Body"]))
    story.append(code_block("cd C:\\Users\\Dell\\Desktop\\Portfolio\nnpm run dev", styles["Code"]))
    story.append(
        Paragraph(
            "Normalmente abre em http://localhost:3000. Para conferir qualidade antes de publicar:",
            styles["Body"],
        )
    )
    story.append(code_block("npm run lint\nnpm run typecheck\nnpm run build", styles["Code"]))

    add_section(story, "7. Cuidados com imagens", styles)
    story.append(
        bullet_items(
            [
                "Prefere PNG ou JPG com boa nitidez.",
                "Mantem imagens de projeto em proporcao horizontal, idealmente perto de 16:10.",
                "Nomes simples reduzem erro: sem muitos sinais, com letras e hifens.",
                "Tudo em public/ e acessado com /nome-do-ficheiro.png.",
                "Se a imagem nao aparece, confirma maiusculas, acentos e extensao do ficheiro.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "8. Publicar na Vercel", styles)
    story.append(
        numbered_items(
            [
                "Garante que npm run build passa sem erro.",
                "Envia as alteracoes para o GitHub.",
                "Na Vercel, importa o repositorio ou deixa o deploy automatico rodar.",
                "Framework Preset deve ficar como Next.js.",
                "Build Command: npm run build.",
                "Se usares EmailJS, configura as variaveis em Environment Variables.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "9. Checklist antes de terminar", styles)
    story.append(
        bullet_items(
            [
                "Cada projeto tem name, description, image, features, technologies e links.",
                "As imagens existem fisicamente dentro de public/.",
                "O site foi visto em desktop e mobile.",
                "Botoes nao ficam com texto cortado.",
                "npm run lint, npm run typecheck e npm run build passam.",
                "Depois do deploy, a URL publica foi conferida.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "10. Comandos uteis", styles)
    story.append(code_block("npm run dev\nnpm run lint\nnpm run typecheck\nnpm run build", styles["Code"]))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
