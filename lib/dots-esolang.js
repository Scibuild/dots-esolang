'use babel';

import DotsEsolangView from './dots-esolang-view';
import { CompositeDisposable } from 'atom';

export default {

  dotsEsolangView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dotsEsolangView = new DotsEsolangView(state.dotsEsolangViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dotsEsolangView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dots-esolang:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.dotsEsolangView.destroy();
  },

  serialize() {
    return {
      dotsEsolangViewState: this.dotsEsolangView.serialize()
    };
  },

  toggle() {
    console.log('DotsEsolang was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
