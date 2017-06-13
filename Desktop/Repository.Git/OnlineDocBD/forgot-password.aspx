<%@ Page Title="" Language="C#" MasterPageFile="~/master/login.Master" AutoEventWireup="true" CodeBehind="forgot-password.aspx.cs" Inherits="OnlineDocBD.forgot_password" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
   
    <script type="text/javascript" src="scripts/application/ValidationHelper.js"></script>
    <script type="text/javascript">
        var emailRegEx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        function HideMessageBox() {
            $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
        }

        $(document).ready(function () {
            $("[id*=btnForgetPassword]").focusout(function () {
                HideEmailPopover();
            });
        });

        $(function () {
            $('[data-toggle="popover"]').popover()
        })

        function HideEmailPopover() {
            $('#emailPopover').popover('hide');
        }

        function LoginFormValidation() {
            isAllValid = true;
            var emailInText = $.trim($("[id*=txtEmail]").val());
            var passInText = $.trim($("[id*=txtPassword]").val());

            if (emailInText == "") {
                $('#emailPopover').attr("data-content", "Enter your email address.");
                $('#emailPopover').popover('show');

                isAllValid = false;
            }


            if (emailInText != "" && !emailRegEx.test(emailInText)) {
                $('#emailPopover').attr("data-content", "Please enter a valid email address.");
                $('#emailPopover').popover('show');
                isAllValid = false;
            }

            return isAllValid;
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <asp:UpdatePanel ID="upnlLogin" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
            <header class="logo-container new-logo-container"> 
               <%-- <img src="<%= BDSKendoWebApp.Utilities.SiteSettings.BaseUrl %>images/logos/CWC-Logo-H.jpg"  alt="" class="img-responsive" />
               --%> 
                
                <h1>Forgotten Password</h1>
            </header>
            <div class="forgot-password-area">
                <div class="form-group col-sm-12 no-padding">
                    <label for="inputEmail" class="col-form-label">
                        Email</label>
                    <span class="pull-right error-message" style="display: none;">Try again</span>
                    <div class="">
                        <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control col-sm-12 dummy_vld"
                            placeholder="Email" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();"
                            OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>
                    </div>
                    <div class="">
                        <button type="button" id="emailPopover" class="btn btn-default btn-popover" data-container="body"
                            data-trigger="focus" data-toggle="popover" data-placement="bottom" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                        </button>
                    </div>
                </div>
                <div class="form-group col-sm-12 no-padding forget-group">
                    <asp:Button ID="btnForgetPassword" runat="server" CssClass="btn btn-primary pull-left"
                        Text="Reset Password" OnClientClick="return LoginFormValidation();" />
                   <%-- <a href="<%= BDSKendoWebApp.Utilities.SiteSettings.BaseUrl %>Default.aspx" class="forgot-password pull-left">
                        Back to Sign in</a>--%>
                </div>
                <div id="MainContent_divMessage" runat="server" class="bg-danger dng error-box" style="display: none;">
                    <span class="col-xs-12">Incorrect field.</span><span class="col-xs-12">Please try again.</span>
                </div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
