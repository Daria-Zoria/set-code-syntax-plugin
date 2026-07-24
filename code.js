const htmlUI = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{
    /* Vario warm system */
    --orange:        #FB4614;
    --orange-hover:  #E23D10;
    --orange-press:  #C9350D;
    --orange-soft:   #FDEEE8;
    --orange-soft-bd:#F8D0BE;
    --orange-tint:   #FCF0EA;

    --ink-900: #1F1815;
    --ink-700: #4A413B;
    --ink-500: #8A7F77;
    --ink-400: #A99E96;
    --ink-300: #C8BEB6;

    --paper:    #FFFDFB;
    --surface:  #FBF7F2;
    --surface-2:#F6F0E9;
    --line:     #ECE3D9;
    --line-2:   #E3D8CC;

    /* platform accents — warm, harmonized */
    --web:     #FB4614;
    --android: #4E8A56;
    --ios:     #7B66A8;

    --ink-950: #15110E;
    --sel-fill: rgba(31,24,21,.055);

    --r-sm: 8px;
    --r-md: 12px;
    --r-lg: 16px;
    --shadow-btn: 0 1px 0 rgba(0,0,0,.04), 0 8px 18px -10px rgba(31,24,21,.55);

    /* semantic tokens (theme-aware) */
    --btn-bg: var(--ink-900);
    --btn-bg-hover: var(--ink-950);
    --btn-bg-press: var(--ink-950);
    --btn-fg: #fff;
    --chip-on-bg: #1f18150e;
  }

  /* ── Dark theme (no absolute black) ── */
  [data-theme="dark"]{
    --orange:#FF6B3D; --orange-hover:#FF7D52; --orange-press:#FF9370;
    --orange-soft:#3D2015; --orange-soft-bd:#5C2F1C; --orange-tint:#2E1911;
    --ink-900:#F3ECE4; --ink-700:#CFC4B9; --ink-500:#9C9085; --ink-400:#7C7065; --ink-300:#5C5249;
    --ink-950:#FFFFFF;
    --paper:#221E1A; --surface:#1C1814; --surface-2:#2D2722; --line:#332D27; --line-2:#41382F;
    --web:#FF6B3D; --android:#6BB073; --ios:#A38FCB;
    --sel-fill:rgba(255,255,255,.06);
    --chip-on-bg:rgba(255,255,255,.06);
    --btn-bg:#F3ECE4; --btn-bg-hover:#FFFFFF; --btn-bg-press:#E7DCD0; --btn-fg:#221E1A;
    --shadow-btn:0 1px 0 rgba(0,0,0,.2), 0 8px 18px -10px rgba(0,0,0,.6);
  }
  [data-theme="dark"] body{background:radial-gradient(120% 90% at 50% -10%, #2A241E 0%, #211C17 55%, #18130F 100%);}
  [data-theme="dark"] .window{border-color:rgba(255,255,255,.06);
    box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 40px 80px -30px rgba(0,0,0,.7),0 12px 28px -16px rgba(0,0,0,.6);}
  [data-theme="dark"] .col-item.sel .cb,
  [data-theme="dark"] .opt-row.sel .opt-cb,
  [data-theme="dark"] .type-opt.sel .opt-cb{background:var(--orange);border-color:var(--orange);}
  [data-theme="dark"] .done-ic{background:var(--orange);}
  [data-theme="dark"] .stage-label{color:#9a8a78;}
  [data-theme="dark"] .body::-webkit-scrollbar-thumb,
  [data-theme="dark"] .ov-scroll::-webkit-scrollbar-thumb,
  [data-theme="dark"] .log-list::-webkit-scrollbar-thumb,
  [data-theme="dark"] .contact-scroll::-webkit-scrollbar-thumb{background:#4a4038;border-color:var(--paper);}
  html{transition:none;}
  body, .window, .titlebar, .steps, .body, .footer, .metabar, .overlay, .contact-page,
  .col-item, .opt-row, .type-opt, .chip{transition:background-color .25s ease, border-color .25s ease, color .25s ease;}

  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{
    font-family:"Instrument Sans",-apple-system,system-ui,sans-serif;
    background:
      radial-gradient(120% 90% at 50% -10%, #F4ECE2 0%, #EBE0D3 55%, #E4D7C7 100%);
    color:var(--ink-900);
    -webkit-font-smoothing:antialiased;
    display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
    gap:22px;padding:36px 20px 40px;min-height:100%;
  }
  .stage-label{
    text-align:center;color:#8c7c6a;font-size:12px;font-weight:600;
    letter-spacing:.14em;text-transform:uppercase;
    display:flex;align-items:center;gap:10px;
  }
  .stage-label .dot{width:5px;height:5px;border-radius:50%;background:var(--orange);}

  /* ── Plugin window ── */
  .window{
    width:400px;height:650px;flex-shrink:0;background:var(--paper);
    border-radius:18px;overflow:hidden;
    box-shadow:
      0 1px 0 rgba(255,255,255,.6) inset,
      0 40px 80px -30px rgba(70,40,20,.45),
      0 12px 28px -16px rgba(70,40,20,.35);
    display:flex;flex-direction:column;position:relative;
    border:1px solid rgba(255,255,255,.5);
  }

  /* Title bar */
  .titlebar{
    height:52px;flex-shrink:0;display:flex;align-items:center;gap:11px;
    padding:0 16px;background:var(--paper);border-bottom:1px solid var(--line);
  }
  .brand-mark{
    width:30px;height:30px;border-radius:9px;flex-shrink:0;
    background:var(--orange);display:flex;align-items:center;justify-content:center;
    box-shadow:0 3px 8px -2px rgba(251,70,20,.5);
  }
  .brand-mark svg{display:block;}
  .titlebar .name{font-size:14px;font-weight:600;letter-spacing:-.01em;flex:1;}
  .titlebar .x{
    width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;
    color:var(--ink-400);cursor:pointer;transition:.15s;
  }
  .titlebar .x:hover{background:var(--surface-2);color:var(--ink-700);}

  /* Step indicator */
  .steps{
    flex-shrink:0;display:flex;align-items:center;gap:0;
    padding:14px 18px 4px;background:var(--paper);
  }
  .step{display:flex;align-items:center;gap:8px;flex:0 0 auto;}
  .step-dot{
    width:22px;height:22px;border-radius:50%;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;border:1.5px solid var(--line-2);
    color:var(--ink-400);background:var(--paper);transition:.2s;
  }
  .step.active .step-dot{background:var(--orange);border-color:var(--orange);color:#fff;box-shadow:0 4px 10px -3px rgba(251,70,20,.45);}
  .step.done .step-dot{background:var(--surface-2);border-color:var(--line-2);color:var(--ink-700);}
  .step-name{font-size:12px;font-weight:600;color:var(--ink-400);transition:.2s;white-space:nowrap;}
  .step.active .step-name{color:var(--ink-900);}
  .step.done .step-name{color:var(--ink-700);}
  .step-bar{flex:1;height:1.5px;background:var(--line-2);margin:0 9px;border-radius:2px;transition:.25s;}
  .step-bar.filled{background:var(--ink-300);}

  /* ── Scroll body ── */
  .body{flex:1;overflow-y:auto;padding:14px 18px 18px;display:flex;flex-direction:column;gap:22px;}
  .body > *{flex-shrink:0;}  /* don't let flex collapse overflow:hidden children (e.g. accordion) */
  .body::-webkit-scrollbar{width:9px;height:9px;}
  .body::-webkit-scrollbar-thumb{background:transparent;border-radius:9px;border:2px solid var(--paper);transition:background-color .15s;}
  .body.is-scrolling::-webkit-scrollbar-thumb{background:#e3d6c7;}

  .section-label{
    font-size:11px;font-weight:700;color:var(--ink-500);
    text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;
  }

  /* Intro */
  .intro{display:flex;flex-direction:column;gap:5px;}
  .intro h1{font-size:18px;font-weight:700;letter-spacing:-.02em;}
  .intro p{font-size:13px;color:var(--ink-700);line-height:1.55;display:block;}
  .intro .by{font-size:11px;color:var(--ink-400);margin-top:6px;display:block;}

  /* Accordion */
  .accordion{border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;background:var(--paper);}
  .acc-trigger{
    display:flex;align-items:center;justify-content:space-between;
    padding:13px 14px;cursor:pointer;user-select:none;background:var(--surface);
    transition:.15s;
  }
  .acc-trigger:hover{background:var(--surface-2);}
  .acc-left{display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:var(--ink-700);}
  .acc-left .ic{width:20px;height:20px;border-radius:6px;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .acc-chev{color:var(--ink-400);transition:transform .22s;display:flex;}
  .acc-chev.open{transform:rotate(90deg);}
  .acc-body{display:none;padding:14px;border-top:1px solid var(--line);background:var(--paper);}
  .acc-body.open{display:block;}
  .acc-body .explain{font-size:12.5px;color:var(--ink-700);line-height:1.65;margin-bottom:13px;}
  code.tok{font-family:"JetBrains Mono",monospace;font-size:11px;background:var(--surface-2);
    border:1px solid var(--line);padding:1px 5px;border-radius:5px;color:var(--orange-press);}

  .type-list{display:flex;flex-direction:column;gap:9px;}
  .type-row{display:flex;gap:11px;padding:12px;border-radius:var(--r-md);background:var(--surface);border:1px solid var(--line);}
  .type-row.skipped{opacity:.62;}
  .type-ic{width:26px;height:26px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
    background:var(--paper);border:1px solid var(--line-2);font-size:13px;color:var(--ink-700);}
  .type-name{font-weight:700;font-size:13px;display:flex;align-items:center;gap:7px;margin-bottom:3px;}
  .type-code{font-family:"JetBrains Mono",monospace;font-size:9.5px;color:var(--orange-press);background:var(--paper);
    border:1px solid var(--line-2);padding:1px 5px;border-radius:4px;letter-spacing:.04em;}
  .type-desc{font-size:11.5px;color:var(--ink-500);line-height:1.5;margin-bottom:7px;}
  .type-ex{display:flex;flex-direction:column;gap:3px;}
  .ex{display:flex;align-items:center;gap:8px;font-size:10.5px;}
  .ex .plat{font-weight:700;width:54px;flex-shrink:0;}
  .ex .plat.web,.ex .plat.android,.ex .plat.ios{color:var(--ink-900);}
  .ex .val{font-family:"JetBrains Mono",monospace;color:var(--ink-700);}
  .skip-badge{font-size:9.5px;font-weight:700;padding:2px 7px;background:var(--surface-2);
    border:1px solid var(--line-2);color:var(--ink-900);border-radius:20px;text-transform:uppercase;letter-spacing:.05em;}

  /* Chips — unified for platforms + variable types */
  .chip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
  .chip-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
  .chip{
    display:flex;align-items:center;justify-content:flex-start;gap:10px;
    padding:9px 13px;border:1.5px solid var(--ink-300);border-radius:12px;
    font-size:13px;font-weight:700;cursor:pointer;user-select:none;
    color:var(--ink-400);background:var(--paper);transition:.15s;letter-spacing:-.01em;
  }
  .chip:hover{border-color:var(--ink-300);color:var(--ink-700);}
  .chip svg{width:19px;height:19px;flex-shrink:0;}
  .chip .chip-dot{display:none;}
  /* active = black outline + semi-transparent fill */
  .chip.on{border-color:var(--ink-900);background:var(--chip-on-bg);color:var(--ink-900);}
  /* thin outline stroke layered on top of filled-path icons (Color/Number/String/Boolean/heart)
     to bulk up their weight — these ship as solid fills, not strokes, so stroke-width alone does nothing */
  .bold-ic path{stroke:currentColor;stroke-width:.25;stroke-linejoin:round;paint-order:stroke fill;}

  .divider{height:1px;background:var(--line);}

  /* Collections */
  .sa-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .select-all{font-size:12px;color:var(--orange);cursor:pointer;font-weight:600;padding:3px 8px;border-radius:6px;transition:.15s;}
  .select-all:hover{background:var(--orange-soft);}
  .collections{display:flex;flex-direction:column;gap:9px;}
  .col-item{
    display:flex;align-items:center;gap:12px;padding:0 14px;
    height:52px;box-sizing:border-box;
    border:1.5px solid var(--line);border-radius:var(--r-md);cursor:pointer;user-select:none;
    transition:.14s;background:var(--paper);
  }
  .col-item:hover{border-color:var(--line-2);background:var(--surface);}
  .col-item.sel{border-color:var(--ink-900);background:var(--sel-fill);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .cb{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--line-2);background:var(--paper);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.14s;}
  .col-item.sel .cb{background:var(--ink-900);border-color:var(--ink-900);}
  .cb svg{display:none;}.col-item.sel .cb svg{display:block;}
  .col-name{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .col-count{font-size:12px;color:var(--ink-400);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .col-meta{flex:1;min-width:0;}
  .col-chip{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--orange);
    background:var(--surface-2);border:1px solid var(--line);padding:3px 7px;border-radius:6px;flex-shrink:0;}
  .col-item.sel .col-chip{color:var(--orange-press);}

  .notice{
    padding:12px 14px;background:var(--orange-soft);border:1.5px solid var(--orange-soft-bd);
    border-radius:var(--r-md);font-size:12.5px;color:var(--orange-press);line-height:1.5;
    display:none;align-items:flex-start;gap:9px;
  }
  .notice.show{display:flex;}
  .notice svg{flex-shrink:0;margin-top:1px;}

  .content{flex:1;position:relative;overflow:hidden;display:flex;flex-direction:column;}

  /* ── Overlays (preview / log) ── */
  .overlay{position:absolute;inset:0;background:var(--paper);z-index:5;
    display:none;flex-direction:column;}
  .overlay.open{display:flex;}
  .ov-head{padding:16px 18px 14px;border-bottom:1px solid var(--line);flex-shrink:0;}
  .ov-head h2{font-size:16px;font-weight:700;letter-spacing:-.02em;}
  .ov-head p{font-size:12.5px;color:var(--ink-500);margin-top:2px;}
  /* preview header never carries a divider — the tab underline (when present) is the only separator */
  #previewOv .ov-head{border-bottom:none;padding-bottom:6px;}
  /* animated "Applying" loader — three compositor-friendly dots that stay smooth even while
     the log is streaming (opacity/transform only, no layout or content animation) */
  .dots{display:inline-flex;gap:3px;margin-left:5px;vertical-align:middle;}
  .dots i{width:4px;height:4px;border-radius:50%;background:currentColor;opacity:.25;
    animation:dotpulse 1s ease-in-out infinite;}
  .dots i:nth-child(2){animation-delay:.16s;}
  .dots i:nth-child(3){animation-delay:.32s;}
  @keyframes dotpulse{0%,80%,100%{opacity:.25;transform:scale(.8);}40%{opacity:1;transform:scale(1);}}
  .ov-scroll{flex:1;overflow-y:auto;padding:14px 18px 16px;}
  .ov-scroll::-webkit-scrollbar{width:9px;height:9px;}
  .ov-scroll::-webkit-scrollbar-thumb{background:transparent;border-radius:9px;border:2px solid var(--paper);transition:background-color .15s;}
  .ov-scroll.is-scrolling::-webkit-scrollbar-thumb{background:#e3d6c7;}

  .pv-group{margin-bottom:18px;}
  .pv-group-head{
    display:flex;align-items:center;gap:7px;cursor:pointer;user-select:none;
    font-size:11px;font-weight:700;color:var(--ink-500);text-transform:uppercase;letter-spacing:.08em;
    padding-bottom:8px;margin-bottom:4px;transition:color .15s;
  }
  .pv-group-head:hover{color:var(--ink-700);}
  .pv-gh-chev{display:flex;color:var(--ink-400);transition:transform .2s;}
  .pv-group.collapsed .pv-gh-chev{transform:rotate(-90deg);}
  .pv-gh-name{flex:1;}
  .pv-group-head .ct{color:var(--ink-400);font-weight:600;letter-spacing:0;text-transform:none;font-size:11px;}
  .pv-group.collapsed .pv-items{display:none;}
  .pv-item{padding:6px 0;border-bottom:1px solid var(--surface-2);}
  .pv-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;}
  .pv-name{font-size:12px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}
  .badge{font-size:9.5px;font-weight:700;padding:3px 7px;border-radius:5px;flex-shrink:0;
    text-transform:uppercase;letter-spacing:.04em;}
  .badge.COLOR,.badge.FLOAT,.badge.STRING,.badge.BOOLEAN{background:var(--surface-2);color:var(--ink-700);border:1px solid var(--line-2);}
  .pv-plats{display:flex;flex-direction:column;gap:2px;padding-left:2px;}
  .pv-plats.pv-dim{opacity:.4;}
  .pv-prow{display:flex;align-items:center;gap:9px;}
  .pv-tag{font-size:10px;font-weight:700;width:54px;flex-shrink:0;}
  .pv-tag.web,.pv-tag.android,.pv-tag.ios{color:var(--ink-700);}
  .pv-css{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--orange);white-space:nowrap;
    background:none;border:none;padding:0;border-radius:0;}

  /* Preview: All / Review filter tabs */
  .pv-tabs{display:none;gap:22px;padding:12px 18px 0;border-bottom:1px solid var(--line);flex-shrink:0;}
  .pv-tab{padding:0 0 10px;font-size:12.5px;font-weight:600;color:var(--ink-400);border-bottom:2px solid transparent;
    cursor:pointer;margin-bottom:-1px;display:flex;align-items:center;gap:6px;}
  .pv-tab.on{color:var(--ink-900);border-bottom-color:var(--ink-900);}
  .pv-tab-ct{font-size:10.5px;color:var(--ink-400);}
  .pv-tab-ct.warn{color:var(--orange);font-weight:700;}
  .pv-tab.on .pv-tab-ct{color:var(--ink-500);}
  .pv-tab.on .pv-tab-ct.warn{color:var(--orange);}

  /* Preview: boolean row — inline name editor */
  .pv-bool .pv-top{gap:10px;}
  .pv-editbtn{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink-700);
    background:var(--paper);border:1px solid var(--line-2);cursor:pointer;padding:7px 12px;border-radius:9px;
    flex-shrink:0;font-family:inherit;margin-left:auto;transition:.15s;}
  .pv-editbtn:hover{background:var(--surface);border-color:var(--ink-300);}
  .pv-editbtn svg{flex-shrink:0;}
  .pv-fields{margin:6px 0 8px;padding:10px;border-radius:9px;background:var(--surface-2);transition:opacity .15s;}
  /* when the variable is skipped, the name editor is inert */
  .pv-bool.skipped .pv-fields{opacity:.45;pointer-events:none;}
  .pv-field-label{font-size:9.5px;font-weight:700;color:var(--ink-500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;}
  .pv-input{width:100%;box-sizing:border-box;font-family:"JetBrains Mono",monospace;font-size:12px;
    padding:7px 9px;border-radius:7px;border:1.5px solid var(--line-2);background:var(--paper);color:var(--ink-900);}
  .pv-input:focus{outline:none;border-color:var(--ink-900);}
  .pv-chips{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;}
  .pv-chip{font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:20px;border:1.3px solid var(--line-2);
    color:var(--ink-500);background:var(--paper);cursor:pointer;user-select:none;}
  .pv-chip:hover{border-color:var(--ink-300);color:var(--ink-700);}
  .pv-chip.on{border-color:var(--ink-900);background:var(--ink-900);color:var(--paper);}
  .pv-skipped-line{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink-400);padding-left:2px;}
  .pv-skiprow{display:flex;align-items:center;gap:10px;margin-top:11px;cursor:pointer;width:max-content;}
  .pv-switch{position:relative;width:30px;height:18px;flex-shrink:0;display:inline-block;}
  .pv-switch input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;}
  .pv-switch-track{position:absolute;inset:0;border-radius:20px;background:var(--line-2);transition:.15s;}
  .pv-switch-thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--paper);
    box-shadow:0 1px 2px rgba(0,0,0,.25);transition:.15s;}
  .pv-switch input:checked ~ .pv-switch-track{background:var(--ink-900);}
  .pv-switch input:checked ~ .pv-switch-track .pv-switch-thumb{transform:translateX(12px);}
  .pv-skiplabel{font-size:12px;font-weight:600;color:var(--ink-900);}

  /* Log */
  .log-list{flex:1;overflow-y:auto;overflow-x:auto;padding:12px 18px;display:flex;flex-direction:column;gap:1px;}
  .log-list::-webkit-scrollbar{width:9px;height:9px;}
  .log-list::-webkit-scrollbar-thumb{background:transparent;border-radius:9px;border:2px solid var(--paper);transition:background-color .15s;}
  .log-list.is-scrolling::-webkit-scrollbar-thumb{background:#e3d6c7;}
  .log-item{font-size:10.5px;display:flex;gap:9px;align-items:center;padding:4px 6px;border-radius:6px;
    min-width:100%;width:max-content;}
  .log-item:nth-child(even){background:var(--surface);}
  .log-ic{width:16px;height:16px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
    font-size:10px;font-weight:700;}
  .log-ic.ok{background:var(--orange-soft);color:var(--orange);}
  .log-ic.skip{background:var(--surface-2);color:var(--ink-400);}
  .log-name{font-family:"JetBrains Mono",monospace;color:var(--ink-500);flex:0 0 auto;white-space:nowrap;}
  .log-val{font-family:"JetBrains Mono",monospace;color:var(--orange);white-space:nowrap;flex-shrink:0;font-weight:500;}
  .log-val.skip{color:var(--ink-400);}

  .done-msg{margin:0 18px 14px;padding:14px;border-radius:var(--r-md);font-size:13px;font-weight:600;
    display:none;align-items:center;gap:10px;flex-shrink:0;}
  .done-msg.show{display:flex;}
  .done-msg.ok{background:var(--surface);color:var(--ink-900);border:1.5px solid var(--line-2);}
  .done-ic{width:24px;height:24px;border-radius:50%;background:var(--ink-900);color:#fff;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}

  /* Footer */
  .footer{flex-shrink:0;padding:14px 18px 18px;border-top:1px solid var(--line);
    display:flex;gap:11px;background:var(--paper);z-index:6;position:relative;}
  .btn{flex:1;padding:14px 16px;border-radius:var(--r-md);font-size:14px;font-weight:700;cursor:pointer;
    border:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;line-height:1;
    letter-spacing:-.01em;transition:.15s;font-family:inherit;}
  .btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;}
  .btn-primary{background:var(--btn-bg);color:var(--btn-fg);box-shadow:var(--shadow-btn);}
  .btn-primary:hover:not(:disabled){background:var(--btn-bg-hover);}
  .btn-primary:active:not(:disabled){background:var(--btn-bg-press);transform:translateY(1px);}
  .btn-secondary{flex:0 0 auto;padding-left:18px;padding-right:18px;background:var(--surface-2);color:var(--ink-700);}
  .btn-secondary:hover:not(:disabled){background:var(--line);}
  .btn svg{flex-shrink:0;}
  .empty{padding:18px 20px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;}
  .empty-ic{display:flex;align-items:center;justify-content:center;color:var(--ink-400);margin-bottom:8px;}
  .empty-title{font-size:14px;font-weight:700;color:var(--ink-900);}
  .empty-sub{font-size:12.5px;color:var(--ink-500);line-height:1.5;max-width:260px;}
  .pv-more{display:block;width:100%;margin:10px 0 2px;padding:9px 12px;border:1px solid var(--line-2);
    border-radius:9px;background:var(--surface);color:var(--orange);font-family:inherit;font-size:12px;
    font-weight:700;cursor:pointer;transition:.15s;letter-spacing:.01em;}
  .pv-more:hover{background:var(--orange-soft);border-color:var(--orange-soft-bd);}

  /* ── Meta footer ── */
  .metabar{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
    padding:10px 18px;border-top:1px solid var(--line);background:var(--surface);}
  .metabar .ver{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:600;color:var(--ink-500);letter-spacing:.01em;white-space:nowrap;}
  .metabar .badge-new{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;
    color:var(--orange);background:var(--orange-soft);border:1px solid var(--orange-soft-bd);padding:2px 7px;border-radius:20px;}
  .metabar .fb{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--orange);
    cursor:pointer;padding:7px 9px;border-radius:9px;transition:.15s;white-space:nowrap;}
  .metabar .fb:hover{background:var(--accent-tint);}
  .metabar .fb svg{flex-shrink:0;}
  .metabar .meta-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;
    border-radius:10px;border:none;background:transparent;color:var(--ink-400);
    cursor:pointer;transition:.15s;flex-shrink:0;padding:0;}
  .metabar .meta-icon:hover{color:var(--orange);background:var(--accent-tint);}

  /* ── Theme switch (light/dark segmented toggle) — square buttons matching the info icon ── */
  .theme-switch{display:inline-grid;grid-template-columns:34px 34px;gap:2px;padding:0;border:0;
    border-radius:10px;background:var(--toggle-fill);flex-shrink:0;}
  .theme-switch button{width:34px;height:34px;border:0;border-radius:10px;background:transparent;
    color:var(--ink-400);display:flex;align-items:center;justify-content:center;cursor:pointer;
    transition:.15s;padding:0;font-family:inherit;}
  .theme-switch button:hover{color:var(--orange);background:var(--accent-tint);}
  .theme-switch button.active{background:var(--toggle-active);color:var(--orange);
    box-shadow:inset 0 0 0 1px var(--toggle-active-bd);}
  .theme-switch button.active:hover{background:var(--accent-tint);box-shadow:inset 0 0 0 1px var(--toggle-active-bd);}
  .theme-switch button:active{transform:scale(.97);}

  /* ── Tooltip (fast, JS-positioned & clamped to the frame, same look in both themes) ── */
  .tooltip{position:fixed;z-index:50;background:#1A1A1A;color:#fff;font-size:12px;font-weight:500;
    padding:7px 10px;border-radius:8px;pointer-events:none;opacity:0;
    transition:opacity .1s ease;white-space:nowrap;max-width:calc(100vw - 16px);}
  .tooltip.show{opacity:1;}
  .tooltip:after{content:"";position:absolute;top:100%;left:var(--arrow-x,50%);transform:translateX(-50%);
    border:5px solid transparent;border-top-color:#1A1A1A;}

  /* ── Contact page ── */
  .info-icon{width:40px;height:40px;border-radius:11px;background:var(--orange-soft);color:var(--orange);
    border:1px solid var(--orange-soft-bd);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .c-head{display:flex;align-items:center;gap:12px;margin:14px 0 12px;}
  .c-head .c-title{margin:0;}
  .contact-page{position:absolute;inset:52px 0 0;background:var(--paper);z-index:20;
    display:none;flex-direction:column;}
  .contact-page.open{display:flex;}
  .contact-scroll{flex:1;overflow-y:auto;padding:28px 22px 20px;position:relative;display:flex;flex-direction:column;}
  .contact-scroll::-webkit-scrollbar{width:9px;height:9px;}
  .contact-scroll::-webkit-scrollbar-thumb{background:transparent;border-radius:9px;border:2px solid var(--paper);transition:background-color .15s;}
  .contact-scroll.is-scrolling::-webkit-scrollbar-thumb{background:#e3d6c7;}
  .wave{font-size:32px;line-height:1;margin:20px 0 6px;}
  .c-title{font-size:23px;font-weight:700;letter-spacing:-.02em;margin:20px 0 12px;}
  .c-text{font-size:13.5px;color:var(--ink-700);line-height:1.62;margin-bottom:13px;}
  .c-text b{font-weight:700;color:var(--ink-900);}
  .c-links{display:flex;flex-direction:column;gap:9px;margin:20px 0 24px;}
  .c-link{display:flex;align-items:center;gap:12px;padding:13px 14px;border:1.5px solid var(--line);
    border-radius:12px;font-size:13.5px;font-weight:600;color:var(--ink-900);text-decoration:none;
    background:var(--paper);transition:.15s;margin:18px 0;}
  .c-link:hover{border-color:var(--ink-300);background:var(--surface);}
  .c-link-txt{display:flex;flex-direction:column;gap:2px;min-width:0;}
  .c-link-title{font-size:13.5px;font-weight:700;color:var(--ink-900);}
  .c-link-sub{font-size:12px;font-weight:500;color:var(--ink-500);}
  .c-link .ci{width:32px;height:32px;border-radius:9px;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .c-link .ci svg{width:18px;height:18px;}
  .c-link .arrow{margin-left:auto;color:var(--ink-400);display:flex;}
  .c-link .arrow svg{width:15px;height:15px;}
  .c-link.coffee{border-color:var(--orange-soft-bd);background:var(--orange-tint);}
  .c-link.coffee .ci{background:var(--orange);color:#fff;}
  .c-contact{margin:16px 0 40px;}
  .c-inline{color:var(--orange);font-weight:600;text-decoration:none;
    border-bottom:1.5px solid var(--orange-soft-bd);white-space:nowrap;transition:.15s;}
  .c-inline:hover{border-bottom-color:var(--orange);}
  .c-inline svg{width:13px;height:13px;vertical-align:-1.5px;margin-right:3px;}
  .c-author{display:flex;align-items:center;gap:12px;margin-top:28px;padding-top:20px;border-top:1px solid var(--line);}
  .c-avatar{width:46px;height:46px;border-radius:50%;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;
    border:1px solid var(--orange-soft-bd);letter-spacing:.02em;}
  .c-name{font-weight:700;font-size:14px;}
  .c-author image-slot{width:46px;height:46px;flex-shrink:0;border:1px solid var(--orange-soft-bd);border-radius:50%;}
  .c-role{font-size:12px;color:var(--ink-500);margin-top:1px;}

  /* ── Multi-screen stage ── */
  .stage-row{display:flex;gap:34px;align-items:flex-start;flex-wrap:wrap;justify-content:center;}
  .frame{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .cap{font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--ink-500);display:flex;align-items:center;gap:9px;}
  .cap .tag{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding:3px 9px;
    border-radius:999px;background:var(--orange-soft);color:var(--orange);border:1px solid var(--orange-soft-bd);}

  /* ── Checkbox option rows (concept screen) ── */
  .opt-list{display:flex;flex-direction:column;gap:9px;}
  .opt-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid var(--line);
    border-radius:var(--r-md);cursor:pointer;user-select:none;background:var(--paper);transition:.14s;}
  .opt-row:hover{border-color:var(--line-2);background:var(--surface);}
  .opt-row.sel{border-color:var(--ink-900);background:var(--sel-fill);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .opt-cb{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--line-2);background:var(--paper);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.14s;}
  .opt-cb svg{display:none;}
  .opt-row.sel .opt-cb,.type-opt.sel .opt-cb{background:var(--ink-900);border-color:var(--ink-900);}
  .opt-row.sel .opt-cb svg,.type-opt.sel .opt-cb svg{display:block;}
  .opt-ic{width:26px;height:26px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--ink-500);}
  .opt-ic.web{color:var(--web);}.opt-ic.android{color:var(--android);}.opt-ic.ios{color:var(--ios);}
  .opt-name{font-weight:600;font-size:14px;color:var(--ink-900);}
  .opt-row:not(.sel) .opt-name,.type-opt:not(.sel) .opt-name{color:var(--ink-500);}

  .type-opt{border:1.5px solid var(--line);border-radius:var(--r-md);background:var(--paper);transition:.14s;overflow:hidden;}
  .type-opt.sel{border-color:var(--ink-900);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .type-opt-head{display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;user-select:none;}
  .type-opt.sel .type-opt-head{background:var(--sel-fill);}
  .type-opt-ex{padding:11px 14px 12px 48px;display:flex;flex-direction:column;gap:6px;
    border-top:1px solid var(--line);background:var(--surface);}
  .type-opt:not(.sel) .type-opt-ex{display:none;}
  .tex-row{display:flex;align-items:center;gap:10px;font-size:11px;transition:opacity .15s;}
  .tex-row.dim{opacity:.3;}
  .tex-plat{width:58px;flex-shrink:0;font-weight:700;color:var(--ink-500);}
  .tex-val{font-family:"JetBrains Mono",monospace;color:var(--orange);white-space:nowrap;}
</style>
<style>
  /* ── Figma plugin iframe overrides ── */
  html, body { height: 100%; }
  body { margin: 0; padding: 0; gap: 0; display: block; min-height: 100%; background: var(--paper); }
  .window { width: 100%; height: 100vh; border: 0; border-radius: 0; box-shadow: none; }
  [data-theme="dark"] body { background: var(--paper); }
  /* no custom title bar anymore -> overlay pages cover from the very top */
  .contact-page { inset: 0; }
  /* Daria's photo avatar (replaces the initials placeholder) */
  img.c-avatar { object-fit: cover; padding: 0; }
  /* error rows in the apply log */
  .log-ic.err { background: #f7ddd2; color: var(--orange-press); }
  .log-val.err { color: var(--orange-press); }
  [data-theme="dark"] .log-ic.err { background: #4a2418; color: var(--orange); }
  /* warning variant of the done banner */
  .done-msg.warn { background: var(--orange-soft); border: 1.5px solid var(--orange-soft-bd); color: var(--orange-press); }
  .done-msg.warn .done-ic { background: var(--orange); }

  /* ── Neutralized palette: warm creams/browns -> neutral greys. Orange accent unchanged. ── */
  :root{
    --ink-900:#1A1A1A; --ink-700:#4D4D4D; --ink-500:#808080; --ink-400:#A3A3A3; --ink-300:#C7C7C7;
    --ink-950:#0D0D0D;
    --paper:#FFFFFF; --surface:#F5F5F5; --surface-2:#EBEBEB; --line:#E6E6E6; --line-2:#D6D6D6;
    --sel-fill:rgba(0,0,0,.05); --chip-on-bg:rgba(0,0,0,.055);
    --shadow-btn:0 1px 0 rgba(0,0,0,.04), 0 8px 18px -10px rgba(0,0,0,.35);
    /* accent hover wash + segmented-control active thumb */
    --accent-tint:rgba(251,70,20,.07); --toggle-fill:#E4E4E4; --toggle-active:#FFFFFF; --toggle-active-bd:#E9E9E9;
  }
  [data-theme="dark"]{
    --ink-900:#EDEDED; --ink-700:#C7C7C7; --ink-500:#9A9A9A; --ink-400:#7A7A7A; --ink-300:#5C5C5C;
    --ink-950:#FFFFFF;
    --paper:#2C2C2C; --surface:#383838; --surface-2:#404040; --line:#3D3D3D; --line-2:#4A4A4A;
    --sel-fill:rgba(255,255,255,.07); --chip-on-bg:rgba(255,255,255,.08);
    --btn-bg:#EDEDED; --btn-bg-hover:#FFFFFF; --btn-bg-press:#D6D6D6; --btn-fg:#2C2C2C;
    --shadow-btn:0 1px 0 rgba(0,0,0,.2), 0 8px 18px -10px rgba(0,0,0,.6);
    --accent-tint:rgba(255,107,61,.12); --toggle-fill:#383838; --toggle-active:#FFFFFF; --toggle-active-bd:#5A5A5A;
  }
  /* neutral scrollbars (were warm tan) — transparent until actively scrolling only */
  .body::-webkit-scrollbar-thumb, .ov-scroll::-webkit-scrollbar-thumb,
  .log-list::-webkit-scrollbar-thumb, .contact-scroll::-webkit-scrollbar-thumb { background:transparent; border-color:var(--paper); }
  .body.is-scrolling::-webkit-scrollbar-thumb,
  .ov-scroll.is-scrolling::-webkit-scrollbar-thumb,
  .log-list.is-scrolling::-webkit-scrollbar-thumb,
  .contact-scroll.is-scrolling::-webkit-scrollbar-thumb { background:#C4C4C4; }
  [data-theme="dark"] .body.is-scrolling::-webkit-scrollbar-thumb,
  [data-theme="dark"] .ov-scroll.is-scrolling::-webkit-scrollbar-thumb,
  [data-theme="dark"] .log-list.is-scrolling::-webkit-scrollbar-thumb,
  [data-theme="dark"] .contact-scroll.is-scrolling::-webkit-scrollbar-thumb { background:#565656; }
  /* neutral selection shadow (was warm) */
  .col-item.sel { box-shadow:0 6px 16px -12px rgba(0,0,0,.28); }
  /* selected checkboxes: neutral & consistent in both themes */
  [data-theme="dark"] .col-item.sel .cb { background:var(--ink-900); border-color:var(--ink-900); }
  .col-item.sel .cb svg { stroke:var(--paper); }
  /* completion icon: orange circle + white glyph + soft orange glow — matches the active step dot */
  .done-ic { background:var(--orange); box-shadow:0 4px 10px -3px rgba(251,70,20,.45); }
  [data-theme="dark"] .done-ic { background:var(--orange); }
  .done-ic svg { stroke:#fff; }
  .done-msg.warn .done-ic svg { stroke:#fff; }

  /* a bit more breathing room under the Select / Preview / Apply stepper (all screens) */
  .steps { padding-bottom: 18px; }

  /* hovering a section (chips/list + its label) gently highlights the label,
     mirroring the collection-header hover on the Preview / Apply screens */
  .section-label { transition: color .15s ease; }
  .sec-hl:hover .section-label { color: var(--ink-700); }
</style>
</head>
<body>

<div class="window" id="win">
  <!-- Step indicator -->
  <div class="steps" id="steps">
    <div class="step active" data-step="1"><div class="step-dot" style="border-width: 1px">1</div><div class="step-name">Select</div></div>
    <div class="step-bar" id="bar1" style="height: 1px"></div>
    <div class="step" data-step="2"><div class="step-dot" style="border-width: 1px">2</div><div class="step-name">Preview</div></div>
    <div class="step-bar" id="bar2" style="height: 1px"></div>
    <div class="step" data-step="3"><div class="step-dot" style="border-width: 1px">3</div><div class="step-name">Apply</div></div>
  </div>

  <div class="content">

  <!-- ── Main body ── -->
  <div class="body" id="mainBody" style="padding: 20px 18px 18px">

    <!-- Platforms -->
    <div class="sec-hl">
      <div class="section-label">Platforms</div>
      <div class="chip-grid" id="platforms">
        <div class="chip on" data-p="WEB" onclick="togglePlat('WEB')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" style="stroke-width: 1.5px"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5a14 14 0 0 1 3.8 9.5 14 14 0 0 1-3.8 9.5 14 14 0 0 1-3.8-9.5A14 14 0 0 1 12 2.5z" style="stroke-width: 1.5px"/></svg>
          <span>Web</span><span class="chip-dot"></span>
        </div>
        <div class="chip" data-p="ANDROID" onclick="togglePlat('ANDROID')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 9.75A5.81 5.81 0 0 1 12 4.5a5.81 5.81 0 0 1 5.82 5.25H6.18zM3.75 10.5a.75.75 0 0 0-.75.75v5.25a.75.75 0 0 0 1.5 0V11.25a.75.75 0 0 0-.75-.75zm16.5 0a.75.75 0 0 0-.75.75v5.25a.75.75 0 0 0 1.5 0V11.25a.75.75 0 0 0-.75-.75zM6 10.5h12a.75.75 0 0 1 .75.75v7.5A1.5 1.5 0 0 1 17.25 20h-1.5v2.25a.75.75 0 0 1-1.5 0V20h-4.5v2.25a.75.75 0 0 1-1.5 0V20h-1.5A1.5 1.5 0 0 1 5.25 18.75v-7.5A.75.75 0 0 1 6 10.5zm.55-6.09 1.5-2.6a.375.375 0 0 1 .65.376l-1.5 2.598a.375.375 0 1 1-.65-.374zm9.9 0a.375.375 0 0 1-.65.374l-1.5-2.598a.375.375 0 0 1 .65-.375l1.5 2.6z"/></svg>
          <span>Android</span><span class="chip-dot"></span>
        </div>
        <div class="chip" data-p="IOS" onclick="togglePlat('IOS')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <span>iOS</span><span class="chip-dot"></span>
        </div>
      </div>
    </div>

    <!-- Types -->
    <div class="sec-hl">
      <div class="section-label">Variable types</div>
      <div class="chip-grid-2" id="types">
        <div class="chip on" data-t="COLOR" onclick="toggleType('COLOR')">
          <svg class="bold-ic" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.95 3.05006C14.0696 4.166 14.7766 5.62938 14.955 7.20006C15.155 8.95006 13.595 10.0001 12.225 10.0001H11C10.7348 10.0001 10.4804 10.1054 10.2929 10.2929C10.1054 10.4805 9.99999 10.7348 9.99999 11.0001V12.2251C9.99999 13.5951 8.94999 15.1551 7.19999 14.9551C6.09023 14.8271 5.02719 14.4355 4.09972 13.8128C3.17224 13.1901 2.40727 12.3545 1.86871 11.3758C1.33016 10.397 1.03366 9.30364 1.00401 8.18692C0.974354 7.0702 1.2124 5.9626 1.69825 4.95667C2.18411 3.95074 2.90366 3.07571 3.79678 2.40468C4.6899 1.73365 5.73064 1.28612 6.83206 1.09948C7.93347 0.912848 9.06356 0.992528 10.1279 1.33187C11.1922 1.6712 12.1599 2.26034 12.95 3.05006ZM13.96 7.31406C14.072 8.28406 13.201 9.00006 12.225 9.00006H11C10.4696 9.00006 9.96085 9.21077 9.58578 9.58584C9.21071 9.96092 8.99999 10.4696 8.99999 11.0001V12.2251C8.99999 13.2011 8.28499 14.0721 7.31399 13.9611C6.19319 13.832 5.13147 13.3896 4.2507 12.6845C3.36992 11.9795 2.70578 11.0404 2.33449 9.97501C1.9632 8.90965 1.89981 7.76118 2.15159 6.66142C2.40337 5.56167 2.96012 4.55518 3.75795 3.75747C4.55577 2.95977 5.56234 2.40317 6.66214 2.15155C7.76193 1.89994 8.91039 1.9635 9.9757 2.33495C11.041 2.7064 11.98 3.37069 12.6849 4.25157C13.3898 5.13245 13.8321 6.19423 13.961 7.31506M8.99999 4.00006C8.99999 4.26527 8.89464 4.51963 8.7071 4.70716C8.51956 4.8947 8.26521 5.00006 7.99999 5.00006C7.73478 5.00006 7.48042 4.8947 7.29289 4.70716C7.10535 4.51963 6.99999 4.26527 6.99999 4.00006C6.99999 3.73484 7.10535 3.48049 7.29289 3.29295C7.48042 3.10541 7.73478 3.00006 7.99999 3.00006C8.26521 3.00006 8.51956 3.10541 8.7071 3.29295C8.89464 3.48049 8.99999 3.73484 8.99999 4.00006ZM5.86599 6.50006C5.93269 6.38629 5.97623 6.26045 5.99409 6.12978C6.01196 5.99912 6.0038 5.86621 5.97009 5.73871C5.93638 5.61121 5.87779 5.49164 5.79768 5.38688C5.71757 5.28212 5.61753 5.19423 5.50332 5.12829C5.38911 5.06235 5.26298 5.01965 5.1322 5.00265C5.00142 4.98565 4.86857 4.99469 4.7413 5.02925C4.61403 5.0638 4.49485 5.12319 4.39062 5.20399C4.28639 5.28479 4.19918 5.38541 4.13399 5.50006C4.00348 5.72961 3.96906 6.00148 4.03824 6.25632C4.10743 6.51116 4.27461 6.72829 4.5033 6.86033C4.73199 6.99237 5.00362 7.02859 5.25891 6.96109C5.51421 6.8936 5.73244 6.72786 5.86599 6.50006ZM11.5 6.86606C11.3862 6.93275 11.2604 6.97629 11.1297 6.99416C10.9991 7.01202 10.8661 7.00386 10.7386 6.97016C10.6111 6.93645 10.4916 6.87785 10.3868 6.79774C10.2821 6.71763 10.1942 6.61759 10.1282 6.50338C10.0623 6.38917 10.0196 6.26305 10.0026 6.13227C9.98559 6.00149 9.99463 5.86864 10.0292 5.74136C10.0637 5.61409 10.1231 5.49491 10.2039 5.39068C10.2847 5.28645 10.3853 5.19924 10.5 5.13406C10.7296 5.00354 11.0014 4.96912 11.2563 5.03831C11.5111 5.1075 11.7282 5.27467 11.8603 5.50336C11.9923 5.73205 12.0285 6.00368 11.961 6.25898C11.8935 6.51427 11.7278 6.73251 11.5 6.86606ZM4.13399 10.5001C4.19918 10.6147 4.28639 10.7153 4.39062 10.7961C4.49485 10.8769 4.61403 10.9363 4.7413 10.9709C4.86857 11.0054 5.00142 11.0145 5.1322 10.9975C5.26298 10.9805 5.38911 10.9378 5.50332 10.8718C5.61753 10.8059 5.71757 10.718 5.79768 10.6132C5.87779 10.5085 5.93638 10.3889 5.97009 10.2614C6.0038 10.1339 6.01196 10.001 5.99409 9.87033C5.97623 9.73967 5.93269 9.61383 5.86599 9.50006C5.73244 9.27225 5.51421 9.10651 5.25891 9.03902C5.00362 8.97152 4.73199 9.00775 4.5033 9.13978C4.27461 9.27182 4.10743 9.48895 4.03824 9.74379C3.96906 9.99863 4.00348 10.2705 4.13399 10.5001Z" fill="currentColor"/></svg>
          <span>Color</span><span class="chip-dot"></span>
        </div>
        <div class="chip on" data-t="FLOAT" onclick="toggleType('FLOAT')">
          <svg class="bold-ic" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.498 5.55001C7.51126 5.41806 7.47156 5.28625 7.38764 5.18358C7.30372 5.0809 7.18245 5.01577 7.0505 5.00251C6.91855 4.98925 6.78675 5.02894 6.68407 5.11287C6.58139 5.19679 6.51626 5.31806 6.503 5.45001L6.447 6.00001H5.5C5.36739 6.00001 5.24021 6.05269 5.14645 6.14645C5.05268 6.24022 5 6.3674 5 6.50001C5 6.63262 5.05268 6.75979 5.14645 6.85356C5.24021 6.94733 5.36739 7.00001 5.5 7.00001H6.348L6.148 9.00001H5.5C5.36739 9.00001 5.24021 9.05269 5.14645 9.14645C5.05268 9.24022 5 9.3674 5 9.50001C5 9.63262 5.05268 9.75979 5.14645 9.85356C5.24021 9.94733 5.36739 10 5.5 10H6.047L6.002 10.45C5.98874 10.582 6.02844 10.7138 6.11236 10.8164C6.19628 10.9191 6.31755 10.9842 6.4495 10.9975C6.58145 11.0108 6.71325 10.9711 6.81593 10.8871C6.91861 10.8032 6.98374 10.682 6.997 10.55L7.053 10H8.547L8.502 10.45C8.49543 10.5153 8.5018 10.5813 8.52074 10.6442C8.53967 10.7071 8.5708 10.7656 8.61236 10.8164C8.65391 10.8673 8.70507 10.9094 8.76292 10.9405C8.82077 10.9716 8.88417 10.9909 8.9495 10.9975C9.01483 11.0041 9.08082 10.9977 9.14369 10.9788C9.20656 10.9598 9.26509 10.9287 9.31593 10.8871C9.36677 10.8456 9.40893 10.7944 9.44 10.7366C9.47106 10.6787 9.49043 10.6153 9.497 10.55L9.553 10H10.5C10.6326 10 10.7598 9.94733 10.8536 9.85356C10.9473 9.75979 11 9.63262 11 9.50001C11 9.3674 10.9473 9.24022 10.8536 9.14645C10.7598 9.05269 10.6326 9.00001 10.5 9.00001H9.652L9.852 7.00001H10.5C10.6326 7.00001 10.7598 6.94733 10.8536 6.85356C10.9473 6.75979 11 6.63262 11 6.50001C11 6.3674 10.9473 6.24022 10.8536 6.14645C10.7598 6.05269 10.6326 6.00001 10.5 6.00001H9.953L9.998 5.55001C10.0046 5.48468 9.9982 5.41869 9.97926 5.35582C9.96033 5.29295 9.9292 5.23442 9.88764 5.18358C9.84609 5.13274 9.79493 5.09058 9.73708 5.05951C9.67923 5.02844 9.61583 5.00907 9.5505 5.00251C9.48517 4.99594 9.41918 5.00231 9.35631 5.02124C9.29344 5.04018 9.23491 5.07131 9.18407 5.11287C9.13323 5.15442 9.09107 5.20558 9.06 5.26343C9.02894 5.32128 9.00957 5.38468 9.003 5.45001L8.947 6.00001H7.453L7.498 5.55001ZM7.153 9.00001L7.353 7.00001H8.848L8.648 9.00001H7.153Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2H4ZM3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H12C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12V4Z" fill="currentColor"/></svg>
          <span>Number</span><span class="chip-dot"></span>
        </div>
        <div class="chip on" data-t="STRING" onclick="toggleType('STRING')">
          <svg class="bold-ic" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H12C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4ZM5.5 5C5.36739 5 5.24021 5.05268 5.14645 5.14645C5.05268 5.24021 5 5.36739 5 5.5V6.5C5 6.63261 5.05268 6.75979 5.14645 6.85355C5.24021 6.94732 5.36739 7 5.5 7C5.63261 7 5.75979 6.94732 5.85355 6.85355C5.94732 6.75979 6 6.63261 6 6.5V6H7.5V10H7C6.86739 10 6.74021 10.0527 6.64645 10.1464C6.55268 10.2402 6.5 10.3674 6.5 10.5C6.5 10.6326 6.55268 10.7598 6.64645 10.8536C6.74021 10.9473 6.86739 11 7 11H9C9.13261 11 9.25979 10.9473 9.35355 10.8536C9.44732 10.7598 9.5 10.6326 9.5 10.5C9.5 10.3674 9.44732 10.2402 9.35355 10.1464C9.25979 10.0527 9.13261 10 9 10H8.5V6H10V6.5C10 6.63261 10.0527 6.75979 10.1464 6.85355C10.2402 6.94732 10.3674 7 10.5 7C10.6326 7 10.7598 6.94732 10.8536 6.85355C10.9473 6.75979 11 6.63261 11 6.5V5.5C11 5.36739 10.9473 5.24021 10.8536 5.14645C10.7598 5.05268 10.6326 5 10.5 5H5.5Z" fill="currentColor"/></svg>
          <span>String</span><span class="chip-dot"></span>
        </div>
        <div class="chip" data-t="BOOLEAN" onclick="toggleType('BOOLEAN')">
          <svg class="bold-ic" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 4H10C11.0609 4 12.0783 4.42143 12.8284 5.17157C13.5786 5.92172 14 6.93913 14 8C14 9.06087 13.5786 10.0783 12.8284 10.8284C12.0783 11.5786 11.0609 12 10 12H6C4.93913 12 3.92172 11.5786 3.17157 10.8284C2.42143 10.0783 2 9.06087 2 8C2 6.93913 2.42143 5.92172 3.17157 5.17157C3.92172 4.42143 4.93913 4 6 4ZM1 8C1 6.67392 1.52678 5.40215 2.46447 4.46447C3.40215 3.52678 4.67392 3 6 3H10C11.3261 3 12.5979 3.52678 13.5355 4.46447C14.4732 5.40215 15 6.67392 15 8C15 9.32608 14.4732 10.5979 13.5355 11.5355C12.5979 12.4732 11.3261 13 10 13H6C4.67392 13 3.40215 12.4732 2.46447 11.5355C1.52678 10.5979 1 9.32608 1 8ZM6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4 7.46957 4.21071 6.96086 4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6C6.53043 6 7.03914 6.21071 7.41421 6.58579C7.78929 6.96086 8 7.46957 8 8C8 8.53043 7.78929 9.03914 7.41421 9.41421C7.03914 9.78929 6.53043 10 6 10ZM3 8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5C6.79565 5 7.55871 5.31607 8.12132 5.87868C8.68393 6.44129 9 7.20435 9 8C9 8.79565 8.68393 9.55871 8.12132 10.1213C7.55871 10.6839 6.79565 11 6 11C5.20435 11 4.44129 10.6839 3.87868 10.1213C3.31607 9.55871 3 8.79565 3 8Z" fill="currentColor"/></svg>
          <span>Boolean</span><span class="chip-dot"></span>
        </div>
      </div>
    </div>

    <!-- Collections -->
    <div class="sec-hl">
      <div class="sa-row">
        <div class="section-label" style="margin-bottom: 0">Collections</div>
        <div class="select-all" id="selectAll" onclick="toggleAll()">Select all</div>
      </div>
      <div class="notice" id="notice">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18.4A2 2 0 0 0 3.5 21.4h17a2 2 0 0 0 1.7-3l-8.5-14.5a2 2 0 0 0-3.4 0z"/></svg>
        <span>Select at least one platform and one variable type to continue.</span>
      </div>
      <div class="collections" id="collections"></div>
    </div>

  </div>

  <!-- ── Preview overlay ── -->
  <div class="overlay" id="previewOv">
    <div class="ov-head">
      <h2>Preview changes</h2>
      <p id="previewSub">Review before applying</p>
    </div>
    <div class="pv-tabs" id="pvTabs"></div>
    <div class="ov-scroll" id="previewScroll"></div>
  </div>

  <!-- ── Log overlay ── -->
  <div class="overlay" id="logOv">
    <div class="ov-head"><h2 id="logTitle">Applying…</h2><p id="logSub">Writing code syntax to your variables</p></div>
    <div class="log-list" id="logList"></div>
    <div class="done-msg" id="doneMsg"></div>
  </div>

  </div><!-- /content -->

  <!-- Footer -->
  <div class="footer">
    <button class="btn btn-secondary" id="btnBack" onclick="goBack()" style="display:none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
    </button>
    <button class="btn btn-primary" id="btnMain" disabled>
      <span id="btnLabel">Preview</span>
      <svg id="btnIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>

  <!-- Meta footer -->
  <div class="metabar" id="metabar">
    <div style="display:flex;align-items:center;gap:9px;">
      <button class="meta-icon" onclick="openInfo()" aria-label="How it works & supported types" data-tooltip="How it works">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/></svg>
      </button>
      <div class="theme-switch" role="group" aria-label="Theme">
        <button id="lightBtn" class="active" data-theme="light" aria-label="Switch to light mode" data-tooltip="Light mode active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.5 12h2M19.5 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4"/></svg>
        </button>
        <button id="darkBtn" data-theme="dark" aria-label="Switch to dark mode" data-tooltip="Switch to dark mode">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M14.3996 8.34091C14.3329 9.57635 13.9098 10.766 13.1814 11.7661C12.453 12.7662 11.4505 13.5339 10.2951 13.9765C9.13969 14.419 7.88085 14.5173 6.67073 14.2597C5.46062 14.002 4.35105 13.3993 3.47614 12.5245C2.60124 11.6497 1.99845 10.5402 1.74066 9.33011C1.48287 8.12002 1.58111 6.86116 2.0235 5.70571C2.46588 4.55026 3.23348 3.54769 4.23351 2.81919C5.23353 2.09068 6.42316 1.66744 7.6586 1.60062C7.94679 1.58496 8.09765 1.92795 7.94466 2.17203C7.43294 2.99077 7.21383 3.95877 7.32307 4.91807C7.43232 5.87736 7.86348 6.77131 8.54619 7.45402C9.2289 8.13673 10.1228 8.56789 11.0821 8.67714C12.0414 8.78639 13.0094 8.56727 13.8282 8.05555C14.073 7.90256 14.4152 8.05271 14.3996 8.34091Z" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
    <span class="fb" onclick="openContact()">
      <svg class="bold-ic" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.75826 8.94585L3.10528 9.30582L3.47859 8.94594L3.10536 8.58597L2.75826 8.94585ZM2.75826 8.94585L2.41121 8.58591L2.0379 8.9458L2.41112 9.30577L2.75826 8.94585ZM7.99935 14.0009L7.65225 14.3608L7.99935 14.6956L8.34646 14.3608L7.99935 14.0009ZM7.99939 3.89083L7.65228 4.25072L7.99939 4.5855L8.34649 4.25072L7.99939 3.89083ZM2.23141 3.40779C3.48501 2.19871 5.52472 2.19871 6.77832 3.40779L7.47254 2.68802C5.83154 1.1053 3.17819 1.1053 1.53719 2.68802L2.23141 3.40779ZM2.23141 7.74304C0.987967 6.54376 0.987967 4.60708 2.23141 3.40779L1.53719 2.68802C-0.113972 4.28055 -0.113962 6.87029 1.5372 8.46281L2.23141 7.74304ZM3.10536 8.58597L2.23141 7.74304L1.5372 8.46281L2.41112 9.30577L3.10536 8.58597ZM8.34646 13.641L3.10536 8.58597L2.41112 9.30577L7.65225 14.3608L8.34646 13.641ZM13.7669 7.74349L7.65225 13.641L8.34646 14.3608L14.4611 8.46326L13.7669 7.74349ZM13.7669 3.40824C15.0103 4.60753 15.0103 6.54421 13.7669 7.74349L14.4611 8.46326C16.1123 6.87074 16.1123 4.281 14.4611 2.68847L13.7669 3.40824ZM9.21998 3.40824C10.4736 2.19916 12.5133 2.19916 13.7669 3.40824L14.4611 2.68847C12.8201 1.10575 10.1668 1.10575 8.52577 2.68847L9.21998 3.40824ZM8.34649 4.25072L9.21998 3.40824L8.52577 2.68847L7.65228 3.53094L8.34649 4.25072ZM6.77832 3.40779L7.65228 4.25072L8.34649 3.53094L7.47254 2.68802L6.77832 3.40779Z" fill="currentColor"/></svg>
      Feedback &amp; ideas
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </span>
  </div>

  <!-- Contact page -->
  <div class="contact-page" id="contactPage">
    <div class="contact-scroll">
      <div class="wave" style="margin: 0px 0px 6px">👋</div>
      <div class="c-title">Oh, hey!</div>
      <p class="c-text" style="margin: 2px 0px 13px">Thanks for using <b>Set Code Syntax</b> — I hope it’s saving you time wiring up code syntax for your design tokens across Web, Android &amp; iOS.</p>
      <p class="c-text">If you have any ideas for features or perhaps ways to improve the plugin, I would love to hear from you.</p>
      <a class="c-link" href="https://github.com/Daria-Zoria/set-code-syntax-plugin" target="_blank" rel="noopener">
        <span class="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.35 9.35 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg></span>
        <span class="c-link-txt"><span class="c-link-title">Suggest a feature on GitHub</span><span class="c-link-sub">Share an idea or report an issue</span></span>
        <span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
      </a>
      <p class="c-text c-contact">Feel free to shoot me an <a class="c-inline" href="mailto:zoriadaria@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>email</a>, send me a <a class="c-inline" href="https://www.linkedin.com/in/dariazoria" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>message</a>, or <a class="c-inline" href="https://buymeacoffee.com/zoriadariay" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>buy me a coffee</a>.</p>
      <div class="c-author" style="border-style: none; margin: 0px; padding: 0px">
        <img class="c-avatar" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wAARCABgAGADASIAAhEBAxEB/8QAHQAAAgMAAwEBAAAAAAAAAAAABwgDBAYAAgUBCf/EADkQAAECBAQCBwcDAwUAAAAAAAECAwAEBREGEiFBBzETIlFhcYGRCBQyQqHB0RWx8BYzUiNicqLx/8QAGgEAAgMBAQAAAAAAAAAAAAAABAUAAwYBAv/EACURAAEDAwQDAAMBAAAAAAAAAAEAAgMEERIFITFBEyJRYcHR8P/aAAwDAQACEQMRAD8AMyUxINhaOIT2xKlEVK1dQi4j6E22iXII4E3IAiKLpoBdRAAFyTtGDxLxcw3htp5xb6phLVwpbQsi45jMdD5XjxMcY0FSnXaTJvJTJMX6dxJ/uEfLfYX/AJyjCUbhK/xanG56eWpnD7SrS7CRbOB858dhsIAlrQHYt4+pnBp7nsyPPz+rZYU9ojCWKJ1cqpTsi4DZCntUr7rjkYLEpNsTzIel3UOtnkpBuDAfrHAGWw1LLmKDlS4gdZC0gocHYoffmIz2EsZPYRq7TThWqQdJQ40pV1NkHUH/AHJ2O4jsda1xspNpz2C6YZSL6xEsaRIy6h9pDrSkrbcAUlQ5EHkY6rBMHpYqq03iFQtFpwW1iBdhr2xxRXk3A0tEyeQvEKNYmB5RFFIPpGbx3XP0DDM5MJXkecHRNkbE8z5C8aMK0gLe0DV/dKZKSiTb/TW6q21yEj7xTO7GMkK+mZnIAUK5SaTONNtLmW2VVF0NFbirAC/W+48hDcYabp1Lo8pLyr7K2kNiymlApPgRCn4Hm5ulvCZlsOTNaVKJS0G2ylKQvJmULq3uo+kMlw/YqFZpVRnKjSHKSlKLtsuKBt28toQSC59Vqqewb7f79L26piKlSoLc5VpaXW4NG3VgFQ8OcLxxOpcrTn01SWeQ7KzTyTnb1FjpfyMbaexLVqDU1r/o6aqgzhKXmlIulJ3AOw3jFcZ6sJ7BsxPpk3pN1BBWy83lKT3j7x1u5A+qTH1cegiNwhraqlhxyScXd6nOloC+uQ6p9NR5QQSNIXvgbVQnE8wznOWdkioDYqbUPrZUMITcAw9pnZRglZaqaGykBQLBJO0QKEWFxXXF6HVhs9piwkxUbVyiyj0iKKUc4W/jlNe+4nXLm5ZZSy0fLrH94Y5KgNTyHOFgx0hdSnqhOHVTj7iyT2DqiANQkxYB9THTo8nl3xF/gw1JUzBzE462lx9xKpggjUrcUVfROUeUaOucRZikNT0s7RKg64yyHFrZa6iiSbNN69ZQFidtecD7hjVHX8IUmbp6EPPllCOiUqw6RJyG52taNTiHE9a6iFy9Ozg2KSpZKPA2630hJGS5xB2stdFGHsGIvstHhzELM5KqE0zZtZzNdIjKcp2IO4JtAh9pOelJfAs+lCUjpSltFtNSfxeNZT6lUZ85ZyTSwjLmDqXApJ8uYgGe05XAxTKbTkvtl9ZW8pJV1gkDKCBubmLqZpfMGDexQmoSNjgc47bW/S5wlnDJ4ywxnVYvFTPiFsj7iGxBuITnCTpk57Bk2RYocaV39U218ocVRGthpDmjPqW/FmK0ewd9XVXIxAuJFEgxCpUGIJdmyQYsIXpfaKiVRODYCOKLlQf93ps07f4W1H6QuWILM0qZc1yhBWSTtqqGBr7tqJOg8i2RbtvpC58UJn9OwpUrWzKbyW7jt6Qm1I5SsYnWmi0T3rBcEOLLuEq6qiTzanqZNvqeaVzVLufN4pNvIw1s7V6DV+jmWy2rMASQecIFhJ0f1TS3nAE5n0J7rEEfiHWwlTQun9CUjqkkadsVV8TWvyA5R2l1DywtJ2ClrGJ5eXOSWaKwn4Up3hM+Js/N4l4hTTk24VqullCdkAbD1MOZWqYlhp1SUDMlJ/aFAqEgJnGs2tawvJMAG2+uvlHqhtG4u/Cq1PKRob+UUHWjKzOH5dIILEuFnTcjSG1kpj3uRlXr/wBxpCvVIhWJ1bYxGwlR5ttJ8AEn8QzlF6lGkEnQhlA08ILoDe6A1AbBXHTaK6jErqrnwiFZhila5mHKMxiviZhrBQKKtUkImQLiVZSXHSNuqOXnaKPEzGycDYWmZ9AvOvHoJVJGnSkGyj3AC/kO2EmqE7M1SYedfdW9MzCipbiyVKWojUntN46B2uE9Ju5DjXSMbvvUql0+fByZy8+EpTYKGlgSYGPF2ZEzK+7kmxutY2ueXoLRY4S4d/RKM/VX9H3wEJUrc7n+dhjxsfrXOsreQMyVKAR3/wAtGcqZfLVXbwFpaWLxUvtyUGcNypmK/TmudnUk27Ao/iHgoKXGaYy4BmKSW1eXIwlD8jM05tM4ytTMyF5kKSbHQkm3rG0o/tDY4pUqiWU7TptLegU/KjP5lJTeD5ad9RZzOkJT1UdKS2S+6aPGzzkrh51bV0rcbUSr/EAQotMZUiccXa70w/vzSm/P+dsenWeOONcVS/ukxNScvLK6pTKywSpQ7MxJMQUCXW1MtuuqKlLcQ2FE/MTc+gBMUeB8As7tXuqY6kgsvstk/OKXXn3VEKSwLE/8EgX+pgoYR9onDM1LtyVYU9TJhtIRnWgraVbS+ZOo8xAUW8TK1yb6w6Ra0jzI/MC1Yu6on4ic3PlvBNA3coLUHbNX6IUnENKxBL9PSqlKzrVrky7oXbxHMecXVcu+PzvoGJKjQqizUqbNvSsy0q7amzbTvG99wdIefA2LUY1wnTK0hAQuYbs62OSHEmygO64uO4iGZFkqBugh7S9fL9RplFQuyJVozDgH+a9B/wBR9YFfDiiCs4hbQ64oMMDpnlXslCBqTf8AbvtHo8XKoa1j2vPNqzoTMFpux+VACdPQxY4fVOVw1RZmecSHHVuBZSdc4SrqJ8CvU9yDFNU8siOPKIpGB8wy4RmxPPy8i5RMPyxS0qZWlJaTpkbFjbu2HeYo4opzClSLGRIShnpVJGyf/besYJFSXUOIFMmphXSLl5ZtwqB+Mq1vbe5VGvxXVmpeoTLrjgSlMs2xYq0F1H8X9Izvj8ZaOzutI2QSBx6GyEeNT0LcmylKQUuLGm9tQfU28owYZFibW7o0+J6w3Vp5KmLFhCCEntJN7/U+keGpJUAnmBrGipWFsYus3WPDpDZXcO09c3NgBJJ0sncm9gPW0EapyokJ4spKQimhRzAWClgWKvC6SPCKHDinNy9QYmHQC5YqaQNcxGt+4JNvE+EaerybM9Me7JsW3QltZvbQ/F9DbxMLauW81uk0oobQZdrx6pLIZwvJt3sp1CHVncnLf73gRVFaSXl3yh1WUdyRzgicT8QIbqLFNlVpUWEjpcuyj8vlp6QMpjrzLaBr0abAHdR38oK06NwZm7tB6lI0v8bel9bWvRCBkJGgA1A7z9obL2aZxbuCZ+WUoqEvPqsCeQUhJ/cGFQv0Y6JJus6qP83hlfZhmR+l4jYueq+yoDxQofaGB4S0cr//2Q==" alt="Daria Zoria" width="46" height="46">
        <div><div class="c-name">Daria Zoria</div><div class="c-role">Product &amp; UX/UI Designer</div></div>
      </div>
    </div>
    <div class="footer">
      <button class="btn btn-secondary" style="flex:1" onclick="closeContact()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back to plugin
      </button>
    </div>
  </div>

  <!-- Info page (How it works & supported types) -->
  <div class="contact-page" id="infoPage">
    <div class="contact-scroll">
      <div class="c-head">
        <div class="info-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/></svg></div>
        <div class="c-title" style="margin:0">How it works</div>
      </div>
      <p class="c-text">Set Code Syntax reads your variable names and converts them to each platform’s naming convention. <code class="tok">color/grey/50</code> becomes <code class="tok">--color-grey-50</code> (Web), <code class="tok">color_grey_50</code> (Android), and <code class="tok">colorGrey50</code> (iOS). Spaces and invalid characters are cleaned automatically.</p>
      <div class="section-label" style="margin:22px 0 12px">Supported types</div>
      <div class="type-list">
        <div class="type-row">
          <div class="type-ic"><svg class="bold-ic" width="13" height="13" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.95 3.05006C14.0696 4.166 14.7766 5.62938 14.955 7.20006C15.155 8.95006 13.595 10.0001 12.225 10.0001H11C10.7348 10.0001 10.4804 10.1054 10.2929 10.2929C10.1054 10.4805 9.99999 10.7348 9.99999 11.0001V12.2251C9.99999 13.5951 8.94999 15.1551 7.19999 14.9551C6.09023 14.8271 5.02719 14.4355 4.09972 13.8128C3.17224 13.1901 2.40727 12.3545 1.86871 11.3758C1.33016 10.397 1.03366 9.30364 1.00401 8.18692C0.974354 7.0702 1.2124 5.9626 1.69825 4.95667C2.18411 3.95074 2.90366 3.07571 3.79678 2.40468C4.6899 1.73365 5.73064 1.28612 6.83206 1.09948C7.93347 0.912848 9.06356 0.992528 10.1279 1.33187C11.1922 1.6712 12.1599 2.26034 12.95 3.05006ZM13.96 7.31406C14.072 8.28406 13.201 9.00006 12.225 9.00006H11C10.4696 9.00006 9.96085 9.21077 9.58578 9.58584C9.21071 9.96092 8.99999 10.4696 8.99999 11.0001V12.2251C8.99999 13.2011 8.28499 14.0721 7.31399 13.9611C6.19319 13.832 5.13147 13.3896 4.2507 12.6845C3.36992 11.9795 2.70578 11.0404 2.33449 9.97501C1.9632 8.90965 1.89981 7.76118 2.15159 6.66142C2.40337 5.56167 2.96012 4.55518 3.75795 3.75747C4.55577 2.95977 5.56234 2.40317 6.66214 2.15155C7.76193 1.89994 8.91039 1.9635 9.9757 2.33495C11.041 2.7064 11.98 3.37069 12.6849 4.25157C13.3898 5.13245 13.8321 6.19423 13.961 7.31506M8.99999 4.00006C8.99999 4.26527 8.89464 4.51963 8.7071 4.70716C8.51956 4.8947 8.26521 5.00006 7.99999 5.00006C7.73478 5.00006 7.48042 4.8947 7.29289 4.70716C7.10535 4.51963 6.99999 4.26527 6.99999 4.00006C6.99999 3.73484 7.10535 3.48049 7.29289 3.29295C7.48042 3.10541 7.73478 3.00006 7.99999 3.00006C8.26521 3.00006 8.51956 3.10541 8.7071 3.29295C8.89464 3.48049 8.99999 3.73484 8.99999 4.00006ZM5.86599 6.50006C5.93269 6.38629 5.97623 6.26045 5.99409 6.12978C6.01196 5.99912 6.0038 5.86621 5.97009 5.73871C5.93638 5.61121 5.87779 5.49164 5.79768 5.38688C5.71757 5.28212 5.61753 5.19423 5.50332 5.12829C5.38911 5.06235 5.26298 5.01965 5.1322 5.00265C5.00142 4.98565 4.86857 4.99469 4.7413 5.02925C4.61403 5.0638 4.49485 5.12319 4.39062 5.20399C4.28639 5.28479 4.19918 5.38541 4.13399 5.50006C4.00348 5.72961 3.96906 6.00148 4.03824 6.25632C4.10743 6.51116 4.27461 6.72829 4.5033 6.86033C4.73199 6.99237 5.00362 7.02859 5.25891 6.96109C5.51421 6.8936 5.73244 6.72786 5.86599 6.50006ZM11.5 6.86606C11.3862 6.93275 11.2604 6.97629 11.1297 6.99416C10.9991 7.01202 10.8661 7.00386 10.7386 6.97016C10.6111 6.93645 10.4916 6.87785 10.3868 6.79774C10.2821 6.71763 10.1942 6.61759 10.1282 6.50338C10.0623 6.38917 10.0196 6.26305 10.0026 6.13227C9.98559 6.00149 9.99463 5.86864 10.0292 5.74136C10.0637 5.61409 10.1231 5.49491 10.2039 5.39068C10.2847 5.28645 10.3853 5.19924 10.5 5.13406C10.7296 5.00354 11.0014 4.96912 11.2563 5.03831C11.5111 5.1075 11.7282 5.27467 11.8603 5.50336C11.9923 5.73205 12.0285 6.00368 11.961 6.25898C11.8935 6.51427 11.7278 6.73251 11.5 6.86606ZM4.13399 10.5001C4.19918 10.6147 4.28639 10.7153 4.39062 10.7961C4.49485 10.8769 4.61403 10.9363 4.7413 10.9709C4.86857 11.0054 5.00142 11.0145 5.1322 10.9975C5.26298 10.9805 5.38911 10.9378 5.50332 10.8718C5.61753 10.8059 5.71757 10.718 5.79768 10.6132C5.87779 10.5085 5.93638 10.3889 5.97009 10.2614C6.0038 10.1339 6.01196 10.001 5.99409 9.87033C5.97623 9.73967 5.93269 9.61383 5.86599 9.50006C5.73244 9.27225 5.51421 9.10651 5.25891 9.03902C5.00362 8.97152 4.73199 9.00775 4.5033 9.13978C4.27461 9.27182 4.10743 9.48895 4.03824 9.74379C3.96906 9.99863 4.00348 10.2705 4.13399 10.5001Z" fill="currentColor"/></svg></div>
          <div>
            <div class="type-name">Color <span class="type-code">COLOR</span></div>
            <div class="type-desc">Color values — backgrounds, text, borders, icons.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--color-brand-primary</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">color_brand_primary</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">colorBrandPrimary</span></div>
            </div>
          </div>
        </div>
        <div class="type-row">
          <div class="type-ic"><svg class="bold-ic" width="13" height="13" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.498 5.55001C7.51126 5.41806 7.47156 5.28625 7.38764 5.18358C7.30372 5.0809 7.18245 5.01577 7.0505 5.00251C6.91855 4.98925 6.78675 5.02894 6.68407 5.11287C6.58139 5.19679 6.51626 5.31806 6.503 5.45001L6.447 6.00001H5.5C5.36739 6.00001 5.24021 6.05269 5.14645 6.14645C5.05268 6.24022 5 6.3674 5 6.50001C5 6.63262 5.05268 6.75979 5.14645 6.85356C5.24021 6.94733 5.36739 7.00001 5.5 7.00001H6.348L6.148 9.00001H5.5C5.36739 9.00001 5.24021 9.05269 5.14645 9.14645C5.05268 9.24022 5 9.3674 5 9.50001C5 9.63262 5.05268 9.75979 5.14645 9.85356C5.24021 9.94733 5.36739 10 5.5 10H6.047L6.002 10.45C5.98874 10.582 6.02844 10.7138 6.11236 10.8164C6.19628 10.9191 6.31755 10.9842 6.4495 10.9975C6.58145 11.0108 6.71325 10.9711 6.81593 10.8871C6.91861 10.8032 6.98374 10.682 6.997 10.55L7.053 10H8.547L8.502 10.45C8.49543 10.5153 8.5018 10.5813 8.52074 10.6442C8.53967 10.7071 8.5708 10.7656 8.61236 10.8164C8.65391 10.8673 8.70507 10.9094 8.76292 10.9405C8.82077 10.9716 8.88417 10.9909 8.9495 10.9975C9.01483 11.0041 9.08082 10.9977 9.14369 10.9788C9.20656 10.9598 9.26509 10.9287 9.31593 10.8871C9.36677 10.8456 9.40893 10.7944 9.44 10.7366C9.47106 10.6787 9.49043 10.6153 9.497 10.55L9.553 10H10.5C10.6326 10 10.7598 9.94733 10.8536 9.85356C10.9473 9.75979 11 9.63262 11 9.50001C11 9.3674 10.9473 9.24022 10.8536 9.14645C10.7598 9.05269 10.6326 9.00001 10.5 9.00001H9.652L9.852 7.00001H10.5C10.6326 7.00001 10.7598 6.94733 10.8536 6.85356C10.9473 6.75979 11 6.63262 11 6.50001C11 6.3674 10.9473 6.24022 10.8536 6.14645C10.7598 6.05269 10.6326 6.00001 10.5 6.00001H9.953L9.998 5.55001C10.0046 5.48468 9.9982 5.41869 9.97926 5.35582C9.96033 5.29295 9.9292 5.23442 9.88764 5.18358C9.84609 5.13274 9.79493 5.09058 9.73708 5.05951C9.67923 5.02844 9.61583 5.00907 9.5505 5.00251C9.48517 4.99594 9.41918 5.00231 9.35631 5.02124C9.29344 5.04018 9.23491 5.07131 9.18407 5.11287C9.13323 5.15442 9.09107 5.20558 9.06 5.26343C9.02894 5.32128 9.00957 5.38468 9.003 5.45001L8.947 6.00001H7.453L7.498 5.55001ZM7.153 9.00001L7.353 7.00001H8.848L8.648 9.00001H7.153Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2H4ZM3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H12C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12V4Z" fill="currentColor"/></svg></div>
          <div>
            <div class="type-name">Number <span class="type-code">FLOAT</span></div>
            <div class="type-desc">Numeric values — spacing, sizing, radius, opacity, font sizes.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--spacing-4</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">spacing_4</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">spacing4</span></div>
            </div>
          </div>
        </div>
        <div class="type-row">
          <div class="type-ic"><svg class="bold-ic" width="13" height="13" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H12C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4ZM5.5 5C5.36739 5 5.24021 5.05268 5.14645 5.14645C5.05268 5.24021 5 5.36739 5 5.5V6.5C5 6.63261 5.05268 6.75979 5.14645 6.85355C5.24021 6.94732 5.36739 7 5.5 7C5.63261 7 5.75979 6.94732 5.85355 6.85355C5.94732 6.75979 6 6.63261 6 6.5V6H7.5V10H7C6.86739 10 6.74021 10.0527 6.64645 10.1464C6.55268 10.2402 6.5 10.3674 6.5 10.5C6.5 10.6326 6.55268 10.7598 6.64645 10.8536C6.74021 10.9473 6.86739 11 7 11H9C9.13261 11 9.25979 10.9473 9.35355 10.8536C9.44732 10.7598 9.5 10.6326 9.5 10.5C9.5 10.3674 9.44732 10.2402 9.35355 10.1464C9.25979 10.0527 9.13261 10 9 10H8.5V6H10V6.5C10 6.63261 10.0527 6.75979 10.1464 6.85355C10.2402 6.94732 10.3674 7 10.5 7C10.6326 7 10.7598 6.94732 10.8536 6.85355C10.9473 6.75979 11 6.63261 11 6.5V5.5C11 5.36739 10.9473 5.24021 10.8536 5.14645C10.7598 5.05268 10.6326 5 10.5 5H5.5Z" fill="currentColor"/></svg></div>
          <div>
            <div class="type-name">String <span class="type-code">STRING</span></div>
            <div class="type-desc">Text values — font families, content strings.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--font-family-sans</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">font_family_sans</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">fontFamilySans</span></div>
            </div>
          </div>
        </div>
        <div class="type-row">
          <div class="type-ic"><svg class="bold-ic" width="13" height="13" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 4H10C11.0609 4 12.0783 4.42143 12.8284 5.17157C13.5786 5.92172 14 6.93913 14 8C14 9.06087 13.5786 10.0783 12.8284 10.8284C12.0783 11.5786 11.0609 12 10 12H6C4.93913 12 3.92172 11.5786 3.17157 10.8284C2.42143 10.0783 2 9.06087 2 8C2 6.93913 2.42143 5.92172 3.17157 5.17157C3.92172 4.42143 4.93913 4 6 4ZM1 8C1 6.67392 1.52678 5.40215 2.46447 4.46447C3.40215 3.52678 4.67392 3 6 3H10C11.3261 3 12.5979 3.52678 13.5355 4.46447C14.4732 5.40215 15 6.67392 15 8C15 9.32608 14.4732 10.5979 13.5355 11.5355C12.5979 12.4732 11.3261 13 10 13H6C4.67392 13 3.40215 12.4732 2.46447 11.5355C1.52678 10.5979 1 9.32608 1 8ZM6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4 7.46957 4.21071 6.96086 4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6C6.53043 6 7.03914 6.21071 7.41421 6.58579C7.78929 6.96086 8 7.46957 8 8C8 8.53043 7.78929 9.03914 7.41421 9.41421C7.03914 9.78929 6.53043 10 6 10ZM3 8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5C6.79565 5 7.55871 5.31607 8.12132 5.87868C8.68393 6.44129 9 7.20435 9 8C9 8.79565 8.68393 9.55871 8.12132 10.1213C7.55871 10.6839 6.79565 11 6 11C5.20435 11 4.44129 10.6839 3.87868 10.1213C3.31607 9.55871 3 8.79565 3 8Z" fill="currentColor"/></svg></div>
          <div>
            <div class="type-name">Boolean <span class="type-code">BOOLEAN</span></div>
            <div class="type-desc">True/false values used to show or hide elements. Names are often generic, so the Preview step lets you review and edit each one — or skip it — before applying.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--is-visible</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">is_visible</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">isVisible</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="btn btn-secondary" style="flex:1" onclick="closeInfo()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back to plugin
      </button>
    </div>
  </div>

</div>

<div class="tooltip" id="tooltip"></div>

<script>
(function(){
  var PLABEL  = { WEB:'Web', ANDROID:'Android', IOS:'iOS' };
  var PCLASS  = { WEB:'web', ANDROID:'android', IOS:'ios' };
  var TYPELBL = { COLOR:'color', FLOAT:'number', STRING:'string', BOOLEAN:'boolean' };
  var BOOL_CONVENTIONAL_PREFIXES = ['is','has','show','can','enable','use'];

  var selected   = new Set();
  var allIds     = [];
  var activePlat = new Set(['WEB']);
  var activeType = new Set(['COLOR','FLOAT','STRING']); // Boolean starts off — opt in from the Select screen
  var step       = 'main';
  var boolOverrides = {}; // { [variableId]: { name: string, skip: bool } }
  var openBoolId  = null; // only one boolean editor open at a time
  var previewTab  = 'all';

  var $ = function(id){ return document.getElementById(id); };
  var btnMain = $('btnMain'), btnBack = $('btnBack'), btnLabel = $('btnLabel'), btnIcon = $('btnIcon');

  var CHEV    = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var CHECK   = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var XICON   = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
  var CBCHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var DONEOK  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var DONEWARN= '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18.4A2 2 0 0 0 3.5 21.4h17a2 2 0 0 0 1.7-3l-8.5-14.5a2 2 0 0 0-3.4 0z"/></svg>';
  var SKIPICON= '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>';
  var PENCIL  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  var CHEVUP  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';

  /* ── Theme: follow Figma automatically, but let the user override via the switch ── */
  var themeManual = false;
  var lightBtn = document.getElementById('lightBtn');
  var darkBtn  = document.getElementById('darkBtn');

  function figmaIsDark(){
    return document.documentElement.classList.contains('figma-dark') || document.body.classList.contains('figma-dark');
  }
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    var dark = t === 'dark';
    if(lightBtn){
      lightBtn.classList.toggle('active', !dark);
      lightBtn.setAttribute('aria-pressed', String(!dark));
      lightBtn.dataset.tooltip = dark ? 'Switch to light mode' : 'Light mode active';
    }
    if(darkBtn){
      darkBtn.classList.toggle('active', dark);
      darkBtn.setAttribute('aria-pressed', String(dark));
      darkBtn.dataset.tooltip = dark ? 'Dark mode active' : 'Switch to dark mode';
    }
  }
  function autoTheme(){ if(!themeManual) setTheme(figmaIsDark() ? 'dark' : 'light'); }

  autoTheme(); // apply the user's current Figma theme on start
  // keep following Figma until the user makes a manual choice
  new MutationObserver(autoTheme).observe(document.documentElement, { attributes:true, attributeFilter:['class'] });
  if(document.body) new MutationObserver(autoTheme).observe(document.body, { attributes:true, attributeFilter:['class'] });

  if(lightBtn) lightBtn.addEventListener('click', function(){ themeManual = true; setTheme('light'); });
  if(darkBtn)  darkBtn.addEventListener('click',  function(){ themeManual = true; setTheme('dark');  });

  /* ── Tooltip: fast, JS-positioned, clamped to fit inside the plugin frame ── */
  var tooltipEl = $('tooltip');
  var EDGE = 8; // min gap from the frame edges
  function showTooltip(el){
    if(!tooltipEl || !el.dataset.tooltip) return;
    tooltipEl.textContent = el.dataset.tooltip;
    tooltipEl.classList.add('show'); // make it measurable
    var r = el.getBoundingClientRect();
    var tw = tooltipEl.offsetWidth, th = tooltipEl.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var centerX = r.left + r.width / 2;
    // clamp horizontally so the whole bubble stays in-frame with a small margin
    var left = Math.max(EDGE, Math.min(centerX - tw / 2, vw - tw - EDGE));
    var top = Math.max(EDGE, r.top - th - 8);
    tooltipEl.style.left = left + 'px';
    tooltipEl.style.top = top + 'px';
    // keep the arrow pointing at the trigger even after clamping
    var arrowX = Math.max(10, Math.min(centerX - left, tw - 10));
    tooltipEl.style.setProperty('--arrow-x', arrowX + 'px');
  }
  function hideTooltip(){ if(tooltipEl) tooltipEl.classList.remove('show'); }
  function wireTooltips(root){
    (root || document).querySelectorAll('[data-tooltip]').forEach(function(el){
      if(el._tooltipWired) return;
      el._tooltipWired = true;
      el.addEventListener('mouseenter', function(){ showTooltip(el); });
      el.addEventListener('mouseleave', hideTooltip);
      el.addEventListener('focus', function(){ showTooltip(el); });
      el.addEventListener('blur', hideTooltip);
      el.addEventListener('click', hideTooltip); // don't let it linger after a click opens a page
    });
  }
  wireTooltips();
  // any scroll or leaving the window dismisses a lingering tooltip
  window.addEventListener('scroll', hideTooltip, true);
  document.addEventListener('mouseleave', hideTooltip);

  /* ── Scrollbars: only show the thumb while hovered or actively scrolling ── */
  document.querySelectorAll('.body, .ov-scroll, .log-list, .contact-scroll').forEach(function(el){
    var t;
    el.addEventListener('scroll', function(){
      el.classList.add('is-scrolling');
      clearTimeout(t);
      t = setTimeout(function(){ el.classList.remove('is-scrolling'); }, 800);
    });
  });

  /* ── Step indicator + button state machine ── */
  function setSteps(active){
    var map = { main:1, preview:2, log:3 }, n = map[active];
    document.querySelectorAll('.step').forEach(function(s){
      var i = +s.dataset.step;
      s.className = 'step' + (i < n ? ' done' : i === n ? ' active' : '');
    });
    $('bar1').className = 'step-bar' + (n > 1 ? ' filled' : '');
    $('bar2').className = 'step-bar' + (n > 2 ? ' filled' : '');
  }
  function setStep(s){
    step = s; setSteps(s);
    $('previewOv').className = 'overlay' + (s === 'preview' ? ' open' : '');
    $('logOv').className     = 'overlay' + (s === 'log'     ? ' open' : '');
    if(s === 'main'){
      btnBack.style.display = 'none';
      btnLabel.textContent = 'Preview'; btnIcon.style.display = '';
      btnIcon.innerHTML = '<polyline points="9 18 15 12 9 6"/>';
      updateBtn();
    } else if(s === 'preview'){
      btnBack.style.display = 'inline-flex';
      btnLabel.textContent = 'Apply'; btnIcon.style.display = '';
      btnIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
      btnMain.disabled = false;
    } else if(s === 'log'){
      btnBack.style.display = 'none';
      btnLabel.textContent = 'Applying\u2026'; btnIcon.style.display = 'none';
      btnMain.disabled = true;
    }
  }
  window.goBack = function(){ setStep('main'); };

  function updateBtn(){
    if(step !== 'main') return;
    var ok = selected.size > 0 && activePlat.size > 0 && activeType.size > 0;
    btnMain.disabled = !ok;
    $('notice').className = 'notice' + ((selected.size > 0) && (activePlat.size === 0 || activeType.size === 0) ? ' show' : '');
  }

  /* ── Collections (real data from the plugin backend) ── */
  function renderCollections(list){
    var c = $('collections'); c.innerHTML = '';
    if(!list || !list.length){
      c.innerHTML =
        '<div class="empty">' +
          '<div class="empty-ic"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10C16 10 14.5 8 12 8C9.5 8 8 10 8 10M9 15L8.99 15M15 15L14.99 15M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM8.5 15C8.5 14.7239 8.72386 14.5 9 14.5C9.27614 14.5 9.5 14.7239 9.5 15C9.5 15.2761 9.27614 15.5 9 15.5C8.72386 15.5 8.5 15.2761 8.5 15ZM14.5 15C14.5 14.7239 14.7239 14.5 15 14.5C15.2761 14.5 15.5 14.7239 15.5 15C15.5 15.2761 15.2761 15.5 15 15.5C14.7239 15.5 14.5 15.2761 14.5 15Z"/></svg></div>' +
          '<div class="empty-title">Oops… nothing here yet</div>' +
          '<div class="empty-sub">This file doesn’t have any variable collections to set code syntax for.</div>' +
        '</div>';
      allIds = []; updateSelectAll(); return;
    }
    allIds = list.map(function(x){ return x.id; });
    list.forEach(function(col){
      var div = document.createElement('div');
      div.className = 'col-item' + (selected.has(col.id) ? ' sel' : '');
      div.dataset.id = col.id;
      div.onclick = function(){ toggleCol(col.id); };
      div.innerHTML =
        '<div class="cb">' + CBCHECK + '</div>' +
        '<div class="col-meta"><div class="col-name">' + col.name + '</div>' +
        '<div class="col-count">' + col.count + ' variable' + (col.count !== 1 ? 's' : '') + '</div></div>';
      c.appendChild(div);
    });
    updateSelectAll();
  }
  function toggleCol(id){
    if(selected.has(id)) selected.delete(id); else selected.add(id);
    var el = $('collections').querySelector('[data-id="' + id + '"]');
    if(el) el.classList.toggle('sel', selected.has(id));
    updateSelectAll(); updateBtn();
  }
  window.toggleAll = function(){
    if(allIds.length && selected.size === allIds.length) selected.clear();
    else allIds.forEach(function(id){ selected.add(id); });
    $('collections').querySelectorAll('.col-item').forEach(function(el){
      el.classList.toggle('sel', selected.has(el.dataset.id));
    });
    updateSelectAll(); updateBtn();
  };
  function updateSelectAll(){
    $('selectAll').textContent = (allIds.length && selected.size === allIds.length) ? 'Deselect all' : 'Select all';
  }

  /* ── Platform / type chips ── */
  window.togglePlat = function(p){
    var el = document.querySelector('[data-p="' + p + '"]');
    if(activePlat.has(p)){ if(activePlat.size === 1) return; activePlat.delete(p); el.classList.remove('on'); }
    else { activePlat.add(p); el.classList.add('on'); }
    updateBtn();
  };
  window.toggleType = function(t){
    var el = document.querySelector('[data-t="' + t + '"]');
    if(activeType.has(t)){ if(activeType.size === 1) return; activeType.delete(t); el.classList.remove('on'); }
    else { activeType.add(t); el.classList.add('on'); }
    updateBtn();
  };

  /* ── Info / contact pages ── */
  window.openInfo    = function(){ hideTooltip(); $('infoPage').classList.add('open'); };
  window.closeInfo   = function(){ hideTooltip(); $('infoPage').classList.remove('open'); };
  window.openContact = function(){ hideTooltip(); $('contactPage').classList.add('open'); };
  window.closeContact= function(){ hideTooltip(); $('contactPage').classList.remove('open'); };

  /* ── Preview (round-trips to the backend) ── */
  function requestPreview(){
    btnLabel.textContent = 'Loading\u2026'; btnIcon.style.display = 'none'; btnMain.disabled = true;
    parent.postMessage({ pluginMessage: {
      type: 'preview',
      selectedIds: Array.from(selected),
      platforms: Array.from(activePlat),
      types: Array.from(activeType)
    }}, '*');
  }
  /* \u2500\u2500 Client-side name converters (mirror the backend exactly, for instant boolean-editor feedback) \u2500\u2500 */
  /* NOTE: this code lives inside a template literal, where "\\s" collapses to the letter "s"
     and silently corrupts regex classes. Keep this split backslash-free. */
  function segsClient(s){ return s.trim().split(/[^A-Za-z0-9]+/).filter(Boolean); }
  function toWebClient(s){ return "--" + segsClient(s).join("-").toLowerCase().replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-+|-+$/g,""); }
  function toAndroidClient(s){
    return segsClient(s).join("_").toLowerCase().replace(/[^a-z0-9_]/g,"").replace(/_+/g,"_").replace(/^_+|_+$/g,"");
  }
  function toIosClient(s){
    var segs = segsClient(s).map(function(x){ return x.toLowerCase().replace(/[^a-z0-9]/g,""); }).filter(Boolean);
    return segs.map(function(x,i){ return i===0 ? x : x.charAt(0).toUpperCase()+x.slice(1); }).join("");
  }
  function baseNameClient(s){ return segsClient(s).join('-').toLowerCase(); }
  function isConventionalBoolName(name){
    var first = segsClient(name)[0];
    return !!(first && BOOL_CONVENTIONAL_PREFIXES.indexOf(first.toLowerCase()) !== -1);
  }

  var lastPreviewItems = [];
  var boolControllers = [];

  function renderItem(it){
    var rows = Object.keys(it.platforms).map(function(p){
      return '<div class="pv-prow"><span class="pv-tag ' + PCLASS[p] + '">' + PLABEL[p] +
             '</span><span class="pv-css">' + it.platforms[p] + '</span></div>';
    }).join('');
    var d = document.createElement('div'); d.className = 'pv-item';
    d.innerHTML = '<div class="pv-top"><span class="badge ' + it.type + '">' +
      (TYPELBL[it.type] || it.type.toLowerCase()) + '</span><span class="pv-name">' + it.name +
      '</span></div><div class="pv-plats">' + rows + '</div>';
    return d;
  }

  function renderBoolItem(it){
    var id = it.id;
    if(!(id in boolOverrides)) boolOverrides[id] = { name: baseNameClient(it.name), skip: false };
    var ov = boolOverrides[id];
    var platformKeys = Object.keys(it.platforms);
    var d = document.createElement('div'); d.className = 'pv-item pv-bool';

    function outputsFor(name){ return { WEB: toWebClient(name), ANDROID: toAndroidClient(name), IOS: toIosClient(name) }; }

    function paint(){
      var open = openBoolId === id;
      d.classList.toggle('open', open);
      d.classList.toggle('skipped', ov.skip);

      var outputs = outputsFor(ov.name);
      var outsHtml = platformKeys.map(function(p){
        return '<div class="pv-prow"><span class="pv-tag ' + PCLASS[p] + '">' + PLABEL[p] +
               '</span><span class="pv-css" data-p="' + p + '">' + outputs[p] + '</span></div>';
      }).join('');

      var presets = [['','As is'],['is-','is-'],['has-','has-'],['show-','show-'],['can-','can-'],['enable-','enable-']];
      var anyPrefixOn = presets.slice(1).some(function(pr){ return ov.name.indexOf(pr[0]) === 0; });
      var chipsHtml = presets.map(function(pr){
        var on = pr[0] === '' ? !anyPrefixOn : ov.name.indexOf(pr[0]) === 0;
        return '<div class="pv-chip' + (on ? ' on' : '') + '" data-p="' + pr[0] + '">' + pr[1] + '</div>';
      }).join('');

      d.innerHTML =
        '<div class="pv-top"><span class="badge BOOLEAN">boolean</span><span class="pv-name">' + it.name + '</span>' +
          '<button class="pv-editbtn" data-role="toggle">' +
            (open ? CHEVUP + 'Done' : PENCIL + 'Edit') +
          '</button></div>' +
        (open ?
          '<div class="pv-fields"><div class="pv-field-label">Name in code</div>' +
          '<input class="pv-input" data-role="input"' + (ov.skip ? ' disabled' : '') + ' value="' + ov.name.replace(/"/g,'&quot;') + '">' +
          '<div class="pv-chips" data-role="chips">' + chipsHtml + '</div></div>'
        : '') +
        (ov.skip && !open ?
          '<div class="pv-skipped-line">' + SKIPICON + '<span>Skipped</span></div>' :
          '<div class="pv-plats' + (ov.skip ? ' pv-dim' : '') + '">' + outsHtml + '</div>'
        ) +
        (open ?
          '<label class="pv-skiprow" data-tooltip="Code syntax will not be added">' +
            '<span class="pv-switch"><input type="checkbox" data-role="skip"' + (ov.skip ? ' checked' : '') + '>' +
            '<span class="pv-switch-track"><span class="pv-switch-thumb"></span></span></span>' +
            '<span class="pv-skiplabel">Skip this variable</span>' +
          '</label>'
        : '');

      var toggleBtn = d.querySelector('[data-role="toggle"]');
      toggleBtn.onclick = function(){
        openBoolId = open ? null : id;
        boolControllers.forEach(function(fn){ fn(); });
      };

      if(open){
        var input = d.querySelector('[data-role="input"]');
        input.oninput = function(){
          ov.name = input.value;
          var out = outputsFor(ov.name);
          platformKeys.forEach(function(p){
            var el = d.querySelector('.pv-css[data-p="' + p + '"]');
            if(el) el.textContent = out[p];
          });
          var anyOn = false;
          d.querySelectorAll('[data-role="chips"] .pv-chip').forEach(function(c){
            var on = c.dataset.p !== '' && ov.name.indexOf(c.dataset.p) === 0;
            c.classList.toggle('on', on);
            if(on) anyOn = true;
          });
          var noneC = d.querySelector('[data-role="chips"] .pv-chip[data-p=""]');
          if(noneC) noneC.classList.toggle('on', !anyOn);
        };
        d.querySelectorAll('[data-role="chips"] .pv-chip').forEach(function(c){
          c.onclick = function(){
            var stripped = ov.name.replace(/^(is-|has-|show-|can-|enable-|use-)/i, '');
            ov.name = c.dataset.p + stripped;
            paint();
          };
        });
        var skipCb = d.querySelector('[data-role="skip"]');
        skipCb.onchange = function(){ ov.skip = skipCb.checked; paint(); };
        wireTooltips(d);
      }
    }

    boolControllers.push(paint);
    paint();
    return d;
  }

  function renderPreviewBody(){
    var items = lastPreviewItems;
    $('previewSub').textContent = items.length + ' variable' + (items.length !== 1 ? 's' : '') + ' will get Code Syntax';

    var boolItems = items.filter(function(it){ return it.type === 'BOOLEAN'; });
    var reviewItems = boolItems.filter(function(it){ return !isConventionalBoolName(it.name); });
    var tabsEl = $('pvTabs');
    if(boolItems.length){
      $('previewOv').classList.add('has-tabs');
      tabsEl.style.display = 'flex';
      tabsEl.innerHTML =
        '<div class="pv-tab' + (previewTab === 'all' ? ' on' : '') + '" data-tab="all">All <span class="pv-tab-ct">' + items.length + '</span></div>' +
        '<div class="pv-tab' + (previewTab === 'review' ? ' on' : '') + '" data-tab="review" data-tooltip="Worth checking before applying">Review <span class="pv-tab-ct warn">' + reviewItems.length + '</span></div>';
      tabsEl.querySelectorAll('.pv-tab').forEach(function(t){
        t.onclick = function(){ previewTab = t.dataset.tab; renderPreviewBody(); };
      });
      wireTooltips(tabsEl);
    } else {
      $('previewOv').classList.remove('has-tabs');
      tabsEl.style.display = 'none';
      tabsEl.innerHTML = '';
    }

    var visibleItems = previewTab === 'review' ? reviewItems : items;
    var groups = {};
    visibleItems.forEach(function(it){ (groups[it.collection] = groups[it.collection] || []).push(it); });

    var scroll = $('previewScroll');
    var collapsedGroups = {};
    scroll.querySelectorAll('.pv-group').forEach(function(g){
      var name = g.querySelector('.pv-gh-name');
      if(name) collapsedGroups[name.textContent] = g.classList.contains('collapsed');
    });
    scroll.innerHTML = '';
    boolControllers = [];

    Object.keys(groups).forEach(function(col){
      var arr = groups[col];
      var g = document.createElement('div'); g.className = 'pv-group' + (collapsedGroups[col] ? ' collapsed' : '');
      var head = document.createElement('div'); head.className = 'pv-group-head';
      head.innerHTML = '<span class="pv-gh-chev">' + CHEV + '</span><span class="pv-gh-name">' +
        col + '</span><span class="ct">' + arr.length + '</span>';
      var wrap = document.createElement('div'); wrap.className = 'pv-items';
      head.onclick = function(){ g.classList.toggle('collapsed'); };
      g.appendChild(head); g.appendChild(wrap);
      var CAP = 60;
      function build(it){ return it.type === 'BOOLEAN' ? renderBoolItem(it) : renderItem(it); }
      arr.slice(0, CAP).forEach(function(it){ wrap.appendChild(build(it)); });
      if(arr.length > CAP){
        var more = document.createElement('button'); more.className = 'pv-more'; more.type = 'button';
        more.textContent = 'Show all ' + arr.length;
        more.onclick = function(){ arr.slice(CAP).forEach(function(it){ wrap.insertBefore(build(it), more); }); more.remove(); };
        wrap.appendChild(more);
      }
      scroll.appendChild(g);
    });
  }

  function renderPreview(items){
    lastPreviewItems = items || [];
    boolOverrides = {};
    openBoolId = null;
    previewTab = 'all';
    renderPreviewBody();
    $('previewScroll').scrollTop = 0;
    setStep('preview');
  }

  /* ── Apply / streamed log ── */
  var logGroups = {}, logCounts = {};
  function logGroup(col){
    if(logGroups[col]) return logGroups[col];
    var g = document.createElement('div'); g.className = 'pv-group';
    var head = document.createElement('div'); head.className = 'pv-group-head';
    head.innerHTML = '<span class="pv-gh-chev">' + CHEV + '</span><span class="pv-gh-name">' +
      col + '</span><span class="ct">0</span>';
    var wrap = document.createElement('div'); wrap.className = 'pv-items';
    head.onclick = function(){ g.classList.toggle('collapsed'); };
    g.appendChild(head); g.appendChild(wrap);
    $('logList').appendChild(g);
    logGroups[col] = { wrap: wrap, ct: head.querySelector('.ct') };
    logCounts[col] = 0;
    return logGroups[col];
  }
  function runApply(){
    setStep('log');
    $('logTitle').innerHTML = 'Applying<span class="dots"><i></i><i></i><i></i></span>';
    $('logSub').textContent = 'Writing code syntax to your variables';
    $('doneMsg').className = 'done-msg';
    $('logList').innerHTML = ''; logGroups = {}; logCounts = {};
    parent.postMessage({ pluginMessage: {
      type: 'run',
      selectedIds: Array.from(selected),
      platforms: Array.from(activePlat),
      types: Array.from(activeType),
      overrides: boolOverrides
    }}, '*');
  }
  // Build a row off-document — nothing here touches the live tree.
  function buildLogRow(msg){
    var status = msg.status === 'ok' ? 'ok' : (msg.status === 'skip' ? 'skip' : 'err');
    var icon   = status === 'ok' ? CHECK : (status === 'skip' ? '\u2013' : XICON);
    var valCls = status === 'ok' ? '' : (status === 'skip' ? ' skip' : ' err');
    var d = document.createElement('div'); d.className = 'log-item';
    d.innerHTML = '<span class="log-ic ' + status + '">' + icon + '</span><span class="log-name">' +
      msg.name + '</span><span class="log-val' + valCls + '">' + msg.platforms + '</span>';
    return d;
  }
  // Collect the batch into one DocumentFragment per collection, then insert once per
  // group. A 200-row batch costs one insertion and one counter write per collection
  // instead of 200 of each, and the list is scrolled a single time at the end.
  function appendLogBatch(items){
    items = items || [];
    if(!items.length) return;
    var frags = {}, added = {}, order = [];
    items.forEach(function(m){
      var col = m.collection || 'Variables';
      if(!frags[col]){ frags[col] = document.createDocumentFragment(); added[col] = 0; order.push(col); }
      frags[col].appendChild(buildLogRow(m));
      added[col]++;
    });
    order.forEach(function(col){
      var grp = logGroup(col);           // creates the group (and logCounts[col]) on first sight
      grp.wrap.appendChild(frags[col]);
      logCounts[col] += added[col];
      grp.ct.textContent = logCounts[col];
    });
    var ll = $('logList'); ll.scrollTop = ll.scrollHeight;
  }
  function finishApply(d){
    d = d || {};
    var setN = d.set || 0, updated = d.updated || 0, alreadySet = d.alreadySet || 0, failed = d.failed || 0, skipped = d.skipped || 0;
    var nothing = !setN && !updated && !alreadySet && !failed;
    $('logTitle').textContent = 'Done';
    $('logSub').textContent = nothing ? 'No changes were applied' : 'Finished applying code syntax';
    var parts = [];
    if(setN)       parts.push(setN + ' set');
    if(updated)    parts.push(updated + ' updated');
    if(alreadySet) parts.push(alreadySet + ' already set');
    if(failed)     parts.push(failed + ' could not be set');
    if(skipped)    parts.push(skipped + ' skipped');
    var dm = $('doneMsg');
    var warn = failed > 0 || nothing;
    dm.className = 'done-msg ok show' + (warn ? ' warn' : '');
    dm.innerHTML = '<span class="done-ic">' + (warn ? DONEWARN : DONEOK) + '</span><span>' +
      (nothing ? 'Nothing to apply \u2014 check your selections' : parts.join(' \u00b7 ')) + '</span>';
    btnLabel.textContent = 'Close'; btnIcon.style.display = 'none'; btnMain.disabled = false;
    // once applying is done, return the list to the top (same as the Preview screen)
    $('logList').scrollTop = 0;
  }

  /* ── Buttons + inbound messages ── */
  btnMain.addEventListener('click', function(){
    if(step === 'main') requestPreview();
    else if(step === 'preview') runApply();
    else parent.postMessage({ pluginMessage: { type: 'close' } }, '*');
  });

  window.onmessage = function(e){
    var msg = e.data && e.data.pluginMessage; if(!msg) return;
    if(msg.type === 'collections')   renderCollections(msg.data);
    else if(msg.type === 'preview')  renderPreview(msg.data);
    else if(msg.type === 'logBatch') appendLogBatch(msg.items);
    else if(msg.type === 'log')      appendLogBatch([msg]);
    else if(msg.type === 'done')     finishApply(msg);
  };

  /* ── External links: inside a Figma iframe native <a> clicks don't open. ──
     Route every link (mailto + https) through window.open so the OS mail client
     / browser opens. Make the author block open LinkedIn too. */
  function openExternal(url){ if(!url) return; try{ window.open(url, '_blank'); }catch(err){} }
  document.querySelectorAll('a[href]').forEach(function(a){
    a.addEventListener('click', function(ev){ ev.preventDefault(); openExternal(a.getAttribute('href')); });
  });
  var authorEl = document.querySelector('.c-author');
  if(authorEl){
    authorEl.style.cursor = 'pointer';
    authorEl.setAttribute('title', 'Open LinkedIn');
    authorEl.addEventListener('click', function(){ openExternal('https://www.linkedin.com/in/dariazoria'); });
  }

  setStep('main');
})();
</script>
</body>
</html>`;

// ─── Naming converters ────────────────────────────────────────────────────────

// Split on any run of non-alphanumeric characters (slashes, dashes, underscores,
// spaces, parentheses, dots, …). Must stay identical to segsClient in the UI.
function splitSegments(name) {
  return name.trim().split(/[^A-Za-z0-9]+/).filter(Boolean);
}

// Web: --segment-segment-segment (lowercase, dashes)
function toWeb(name) {
  return "--" + splitSegments(name).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

// Android: segment_segment_segment (lowercase, underscores).
// The name is converted verbatim — no prefixes are invented. Code syntax is a
// display hint in Dev Mode, so a digit-leading token keeps its digit-leading name.
function toAndroid(name) {
  return splitSegments(name).join("_").toLowerCase().replace(/[^a-z0-9_]/g, "").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
}

// iOS: segmentSegmentSegment (camelCase), converted verbatim like Android.
function toIos(name) {
  const segs = splitSegments(name).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, "")).filter(Boolean);
  return segs.map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

// Validators only require a non-empty, well-formed result. Digit-leading names are
// allowed on every platform — the syntax mirrors the token's actual name; renaming
// tokens to letter-first identifiers is the design system's call, not the plugin's.
function isValidWeb(s) { return /^--[a-z0-9][a-z0-9-]*$/.test(s); }
function isValidAndroid(s) { return /^[a-z0-9][a-z0-9_]*$/.test(s); }
function isValidIos(s) { return /^[a-z0-9][a-zA-Z0-9]*$/.test(s); }

const converters = {
  WEB:     { fn: toWeb,     validate: isValidWeb },
  ANDROID: { fn: toAndroid, validate: isValidAndroid },
  IOS:     { fn: toIos,     validate: isValidIos },
};

// ─── Load variables, filtered by resolved type at the source ──────────────────

// Fetching per resolved type instead of per variable ID pushes the type filter into
// Figma: with only Color selected, a collection full of Number/String variables is
// never fetched at all. Previously every variable in a selected collection was loaded
// and then discarded by the resolvedType check.
// Results are re-sorted into the original collection / variable order so the Preview
// grouping and the Apply log read exactly as before.
async function loadVariables(collections, selectedIds, types) {
  const selectedColIds = new Set(selectedIds);
  const colNameMap = {}, colOrder = {}, varOrder = {};
  collections.forEach((col, ci) => {
    colNameMap[col.id] = col.name;
    colOrder[col.id] = ci;
    col.variableIds.forEach((id, vi) => { varOrder[id] = vi; });
  });

  const LAST = Number.MAX_SAFE_INTEGER; // variables added after launch sort to the end
  const perType = await Promise.all(
    Array.from(types).map(t => figma.variables.getLocalVariablesAsync(t))
  );

  const results = [];
  for (const vars of perType) {
    for (const v of vars) {
      const cid = v.variableCollectionId;
      if (!selectedColIds.has(cid)) continue;
      results.push({ v, colName: colNameMap[cid] || "Variables" });
    }
  }

  results.sort((a, b) => {
    const ca = colOrder[a.v.variableCollectionId], cb = colOrder[b.v.variableCollectionId];
    if (ca !== cb) return (ca === undefined ? LAST : ca) - (cb === undefined ? LAST : cb);
    const va = varOrder[a.v.id], vb = varOrder[b.v.id];
    return (va === undefined ? LAST : va) - (vb === undefined ? LAST : vb);
  });

  return results;
}

// ─── Preview cache ────────────────────────────────────────────────────────────

// Preview and Apply need the identical set of variables, and loading it twice was the
// largest avoidable cost in the Apply step. The preview result is kept and reused when
// the selection still matches.
// The key covers collection IDs and variable types only — those are what determine
// which variables get loaded. Platforms change the generated strings, not the payload,
// so switching platform on the Select screen doesn't need to discard the cache.
// Variables are live objects, so a reused entry still reports current codeSyntax.
let previewCache = null; // { key, vars }

function selectionKey(selectedIds, types) {
  const norm = arr => (arr || []).slice().sort().join(",");
  return norm(selectedIds) + "|" + norm(types);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  figma.showUI(htmlUI, { width: 400, height: 650, title: "Set Code Syntax", themeColors: true });

  figma.ui.postMessage({
    type: "collections",
    data: collections.map(c => ({ id: c.id, name: c.name, count: c.variableIds.length }))
  });

  figma.ui.onmessage = async (msg) => {

    if (msg.type === "preview") {
      const platforms = msg.platforms;
      const types = new Set(msg.types);
      const previews = [];
      const warnings = [];

      try {
        // The Preview step always reads fresh — it's the source of truth the user
        // approves — and hands the loaded set to Apply through the cache.
        const vars = await loadVariables(collections, msg.selectedIds, types);
        previewCache = { key: selectionKey(msg.selectedIds, msg.types), vars };
        for (const { v, colName } of vars) {
          const platResults = {};
          let hasInvalid = false;
          for (const p of platforms) {
            const val = converters[p].fn(v.name);
            platResults[p] = val;
            if (!converters[p].validate(val)) hasInvalid = true;
          }
          previews.push({ id: v.id, name: v.name, type: v.resolvedType, platforms: platResults, collection: colName });
          if (hasInvalid) warnings.push(v.name);
        }
      } catch(e) {
        figma.notify("Preview error: " + e.message, { error: true });
      }

      figma.ui.postMessage({ type: "preview", data: previews, warnings });
    }

    if (msg.type === "run") {
      const platforms = msg.platforms;
      const types = new Set(msg.types);
      const overrides = msg.overrides || {};
      let updated = 0, set = 0, skipped = 0, failed = 0, alreadySet = 0;

      // Batch the streamed log entries and yield to the UI every LOG_BATCH items.
      // setVariableCodeSyntax is synchronous, so without an explicit macrotask yield the
      // whole loop would block and the progress log + loader would appear frozen.
      let logBatch = [];
      let processed = 0;
      const LOG_BATCH = 200;
      const flushLogs = () => { if (logBatch.length) { figma.ui.postMessage({ type: "logBatch", items: logBatch }); logBatch = []; } };

      let vars = [];
      try {
        const key = selectionKey(msg.selectedIds, msg.types);
        vars = (previewCache && previewCache.key === key)
          ? previewCache.vars
          : await loadVariables(collections, msg.selectedIds, types);
      } catch(e) {
        figma.ui.postMessage({ type: "done", updated: 0, set: 0, skipped: 0, failed: 0, alreadySet: 0 });
        figma.notify("Error loading variables: " + e.message, { error: true });
        return;
      }

      for (const { v, colName } of vars) {
        if (processed > 0 && processed % LOG_BATCH === 0) { flushLogs(); await new Promise(r => setTimeout(r, 0)); }
        processed++;
        try {
          // No resolvedType check here any more — loadVariables only returns the
          // selected types, so "skipped" now counts exactly the variables the user
          // skipped in the Preview step, not deselected types.
          const override = overrides[v.id];
          if (override && override.skip) {
            skipped++;
            logBatch.push({ type: "log", status: "skip", name: v.name, platforms: "skipped", collection: colName });
            continue;
          }
          const sourceName = (override && override.name) ? override.name : v.name;

          // Validate per platform. Previously a single invalid platform blocked ALL of them \u2014
          // now we set whichever platforms are valid and only fail the row if none are.
          const platResults = {};
          const invalidPlats = [];
          for (const p of platforms) {
            const val = converters[p].fn(sourceName);
            if (converters[p].validate(val)) platResults[p] = val;
            else invalidPlats.push(p);
          }

          if (Object.keys(platResults).length === 0) {
            failed++;
            logBatch.push({ type: "log", status: "error", name: v.name, platforms: "\u26a0\ufe0f invalid name", collection: colName });
            continue;
          }

          // Figma API platform name map \u2014 "IOS" must be passed as "iOS"
          const platformAPIName = { WEB: "WEB", ANDROID: "ANDROID", IOS: "iOS" };
          const validPlats = Object.keys(platResults);

          // Check if every valid platform already holds this exact value
          const alreadyAllSet = validPlats.every(p => {
            const existing = v.codeSyntax && v.codeSyntax[platformAPIName[p] || p];
            return existing === platResults[p];
          });
          if (alreadyAllSet) {
            alreadySet++;
            logBatch.push({ type: "log", status: "skip", name: v.name, platforms: "already set", collection: colName });
            continue;
          }

          // Was any target platform previously filled? If not, this is a first-time SET; otherwise it's an UPDATE.
          const hadPrior = validPlats.some(p => {
            const existing = v.codeSyntax && v.codeSyntax[platformAPIName[p] || p];
            return existing != null && existing !== "";
          });

          // Set each platform syntax separately with individual try/catch.
          // Platforms whose stored value already matches are counted but not rewritten —
          // the Figma write is the slow part, so skipping no-op writes speeds up re-runs a lot.
          const applied = [];
          for (const [p, val] of Object.entries(platResults)) {
            try {
              const apiKey = platformAPIName[p] || p;
              const existing = v.codeSyntax && v.codeSyntax[apiKey];
              if (existing !== val) v.setVariableCodeSyntax(apiKey, val); // synchronous API — no await needed
              applied.push(val);
            } catch(e) {
              logBatch.push({ type: "log", status: "error", name: v.name + " [" + p + "]", platforms: e.message, collection: colName });
            }
          }

          if (applied.length > 0) {
            if (hadPrior) updated++; else set++;
            logBatch.push({ type: "log", status: "ok", name: v.name, platforms: applied.join(" \u00b7 "), collection: colName });
          } else {
            failed++;
          }

        } catch(e) {
          failed++;
          logBatch.push({ type: "log", status: "error", name: v.name, platforms: e.message, collection: colName });
        }
      }

      flushLogs();
      figma.ui.postMessage({ type: "done", updated, set, skipped, failed, alreadySet });
    }

    if (msg.type === "close") figma.closePlugin();
  };
})();
