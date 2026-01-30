import os
import base64

# Paths
md_path = r"C:\Users\haitr\OneDrive\0. GAU DATA\0.APP\ELEMENTA\Elementa_Technical_Design.md"
html_path = r"C:\Users\haitr\OneDrive\0. GAU DATA\0.APP\ELEMENTA\Elementa_Design_Spec.html"

# Read Markdown
try:
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Encode MD content to Base64 to avoid HTML syntax errors
    md_base64 = base64.b64encode(md_content.encode('utf-8')).decode('utf-8')

    # HTML Template
    html_content = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ELEMENTA Technical Design</title>
    <!-- Tailwind for utilities -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Marked for MD parsing -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <!-- Mermaid for diagrams -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.8.0/dist/mermaid.min.js"></script>
    
    <style>
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
        
        :root {{
            --color-amber: #FFB300;
            --color-black: #111111;
            --color-gray: #F4F4F4;
        }}

        body {{ 
            font-family: 'Inter', sans-serif; 
            background-color: #F8F8F8; 
            color: var(--color-black);
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }}
        
        /* Typography Scale */
        h1, h2, h3, h4, kbd {{ font-family: 'Space Mono', monospace; text-transform: uppercase; letter-spacing: -0.02em; }}
        code, pre {{ font-family: 'JetBrains Mono', monospace; }}

        /* Layout */
        .page-container {{
            max-width: 1100px;
            margin: 40px auto;
            background: white;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
            border: 1px solid #E5E5E5;
        }}

        .cover-page {{
            background: var(--color-black);
            color: white;
            padding: 80px 60px;
            border-bottom: 4px solid var(--color-amber);
            margin-bottom: 60px;
        }}

        .content-body {{
            padding: 0 60px 80px 60px;
        }}

        /* Heading Styles */
        h1 {{ 
            font-size: 2.5rem; 
            font-weight: 700; 
            margin-top: 3rem; 
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--color-amber);
            color: var(--color-black);
        }}
        
        h2 {{ 
            font-size: 1.75rem; 
            font-weight: 700; 
            margin-top: 3rem; 
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            color: var(--color-black);
        }}
        h2::before {{
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--color-amber);
            margin-right: 12px;
        }}

        h3 {{ 
            font-size: 1.25rem; 
            font-weight: 700; 
            margin-top: 2rem; 
            margin-bottom: 0.75rem;
            color: #333;
        }}

        /* Elements */
        p {{ margin-bottom: 1rem; color: #444; }}
        
        ul, ol {{ margin-bottom: 1.5rem; padding-left: 1.5rem; }}
        ul {{ list-style-type: square; }}
        li {{ margin-bottom: 0.5rem; color: #444; }}

        blockquote {{
            border-left: 4px solid var(--color-amber);
            background: #FFF8E1;
            padding: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: #555;
        }}

        /* Tables - Industrial Style */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.9rem;
            font-family: 'JetBrains Mono', monospace;
        }}
        th {{
            background: var(--color-black);
            color: white;
            text-align: left;
            padding: 12px 16px;
            text-transform: uppercase;
        }}
        td {{
            border-bottom: 1px solid #E5E5E5;
            padding: 12px 16px;
        }}
        tr:nth-child(even) {{ background: #FAFAFA; }}

        /* Code Blocks */
        pre {{
            background: #1A1A1A;
            color: #E0E0E0;
            padding: 1.5rem;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 0.85rem;
            border-left: 4px solid #333;
        }}
        code {{
            background: #F0F0F0;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.85em;
            color: #D32F2F;
        }}
        pre code {{
            background: transparent;
            color: inherit;
            padding: 0;
        }}

        /* Mermaid Diagrams Container */
        .mermaid {{
            background: white;
            padding: 20px;
            border: 1px solid #E5E5E5;
            border-radius: 8px;
            margin: 2rem 0;
            text-align: center;
            display: flex;
            justify-content: center;
        }}

        /* Custom Scrollbar */
        ::-webkit-scrollbar {{ width: 8px; }}
        ::-webkit-scrollbar-track {{ background: #f1f1f1; }}
        ::-webkit-scrollbar-thumb {{ background: #ccc; }}
        ::-webkit-scrollbar-thumb:hover {{ background: #bbb; }}

        /* Loading Overlay */
        #loader {{
            position: fixed; inset: 0; background: white; z-index: 9999;
            display: flex; justify-content: center; align-items: center;
            font-family: 'Space Mono', monospace;
        }}
    </style>
</head>
<body>
    <div id="loader">
        <div class="animate-pulse text-xl">INITIALIZING DOCUMENTATION SYSTEM...</div>
    </div>

    <div class="page-container">
        <div class="cover-page">
            <div class="font-mono text-amber-500 mb-4">SYSTEM V1.0</div>
            <h1 style="color: white; border: none; margin: 0; padding: 0;">ELEMENTA</h1>
            <div class="text-xl mt-2 opacity-80 font-mono">Technical Design Document</div>
        </div>
        <div id="content" class="content-body"></div>
    </div>

    <script>
        // Data from Python Script
        const MD_BASE64 = "{md_base64}";

        // --- SETUP ---
        document.addEventListener('DOMContentLoaded', async () => {{
            try {{
                // 1. Decode MD
                const rawMd = new TextDecoder().decode(
                    Uint8Array.from(atob(MD_BASE64), c => c.charCodeAt(0))
                );

                // 2. Configure Mermaid
                mermaid.initialize({{ 
                    startOnLoad: false, 
                    theme: 'base',
                    securityLevel: 'loose',
                    themeVariables: {{
                        'primaryColor': '#ffffff',
                        'primaryTextColor': '#111111',
                        'primaryBorderColor': '#111111',
                        'lineColor': '#111111',
                        'secondaryColor': '#f4f4f4',
                        'tertiaryColor': '#ffffff',
                        'fontFamily': 'Space Mono'
                    }}
                }});

                // 3. Configure Marked
                const renderer = new marked.Renderer();
                
                // Custom Code Renderer for Mermaid
                renderer.code = function(code, language) {{
                    if (language === 'mermaid') {{
                        return '<div class="mermaid">' + code + '</div>';
                    }}
                    return '<pre><code class="language-' + language + '">' + code + '</code></pre>';
                }};
                
                // Custom Table Renderer
                renderer.table = function(header, body) {{
                    return '<div class="overflow-x-auto"><table><thead>' + header + '</thead><tbody>' + body + '</tbody></table></div>';
                }};

                marked.setOptions({{ renderer: renderer }});

                // 4. Render MD to HTML
                document.getElementById('content').innerHTML = marked.parse(rawMd);

                // 5. Run Mermaid
                await mermaid.run({{
                    nodes: document.querySelectorAll('.mermaid')
                }});

                // 6. Hide Loader
                document.getElementById('loader').style.display = 'none';

            }} catch (e) {{
                console.error(e);
                document.getElementById('loader').innerHTML = '<div class="text-red-500">ERROR LOADING DOCS: ' + e.message + '</div>';
            }}
        }});
    </script>
</body>
</html>"""

    # Write HTML
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Successfully created: {{html_path}}")

except Exception as e:
    print(f"Error: {{e}}")
